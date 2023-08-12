import { Handler } from "express";
import User from "../user/user.model";
import { HTTPError } from "../../common/http-error";
import { hash, compare } from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { loginBodySchema, registerBodySchema } from "./auth.validator";
import { Input, parse } from "valibot";

export const login: Handler = async (req, res, next) => {
  try {
    const body: Input<typeof loginBodySchema> = req.body;
    parse(loginBodySchema, body);
    loginBodySchema;
    const user = await User.findOne({ email: body.email });
    if (!user || !(await compare(body.password, user.password))) {
      throw new HTTPError(400, "Invalid credentials");
    }
    // @ts-ignore
    user.password = undefined;
    const refreshSecret = process.env.JWT_REFRESH_SECRET || "refresh-secret";
    const accessSecret = process.env.JWT_ACCESS_SECRET || "access-secret";
    const tokenId = crypto.randomBytes(5).toString("hex");

    const refreshToken = jwt.sign({ tokenId, user }, refreshSecret, {
      expiresIn: "30d",
    });
    const accessToken = jwt.sign({ tokenId, user }, accessSecret, {
      expiresIn: "1h",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      domain: ".localhost",
      maxAge: 1000 * 3600 * 24 * 30, // 30 days max age
    });

    res.status(200).json({
      code: 200,
      status: "success",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register: Handler = async (req, res, next) => {
  try {
    const body: Input<typeof registerBodySchema> = req.body;
    parse(registerBodySchema, body);
    body.password = await hash(body.password!, 7);
    const user = await User.create({ ...body, isAdmin: false });
    if (user) {
      res.status(201).json({
        code: 201,
        status: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const logout: Handler = (req, res) => {
  res.clearCookie("refresh_token");
  res.status(200).json({
    statusCode: 200,
    status: "success",
  });
};

export const recover: Handler = (req, res) => {
  // TODO: send email to recover password
};

export const newPassword: Handler = (req, res) => {
  // TODO: change password
};

export const refresh: Handler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
      console.log("refresh token not available");
      res.locals.logout = true;
      throw new HTTPError(308, "logout");
    }
    const refreshSecret = process.env.JWT_REFRESH_SECRET || "refresh-secret";
    const accessSecret = process.env.JWT_ACCESS_SECRET || "access-secret";
    const profile: any = jwt.verify(refreshToken, refreshSecret);
    const user = await User.findById(profile.user._id);
    if (!user) {
      res.locals.logout = true;
      throw new HTTPError(308, "logout");
    }

    const accessToken = jwt.sign(
      {
        tokenId: profile.tokenId,
        user,
      },
      accessSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
