import { Handler } from "express";
import User, { IUser } from "../user/user.model";
import { HTTPError } from "../../common/http-error";
import { hash, compare } from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const login: Handler = async (req, res, next) => {
  try {
    const body: { login: string; password: string } = req.body;
    const user = await User.findOne({
      $or: [{ email: body.login }, { username: body.login }],
    });
    if (!user || !(await compare(body.password, user.password))) {
      throw new HTTPError(400, "Invalid credentials");
    }
    //@ts-ignore
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
      secure: true,
      domain: ".localhost",
      maxAge: 1000 * 3600 * 24 * 30, // 30 days nax age
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
    const body: Omit<IUser, "_id"> = req.body;
    body.isAdmin = false;
    body.password = await hash(body.password, 7);
    const user = await User.create(body);
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

export const recover: Handler = (req, res) => {};

export const refresh: Handler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    let accessToken = req.headers.authorization;

    if (!refreshToken || !accessToken) {
      res.locals.logout = true;
      throw new HTTPError(308, "logout");
    }

    const accessSecret = process.env.JWT_ACCESS_SECRET || "access-secret";
    const refreshSecret = process.env.JWT_REFRESH_SECRET || "refresh-secret";
    const refreshResult: any = jwt.verify(refreshToken, refreshSecret);
    const accessResult: any = jwt.verify(accessToken, accessSecret, {
      ignoreExpiration: true,
    });

    if (refreshResult.tokenId != accessResult.tokenId) {
      res.locals.logout = true;
      throw new HTTPError(308, "logout");
    }

    const user = await User.findById(refreshResult.user_id);
    if (!user) {
      res.locals.logout = true;
      throw new HTTPError(308, "logout");
    }

    accessToken = jwt.sign(
      {
        tokenId: refreshResult.tokenId,
        user,
      },
      accessSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      statusCode: 200,
      status: "success",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
