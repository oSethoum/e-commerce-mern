import { Handler } from "express";
import User, { IUser } from "../user/user.model";
import { compareHash, hashString } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

export const login: Handler = async (req, res, next) => {
  try {
    const body: { login: string; password: string } = req.body;
    const user = await User.findOne({
      $or: [{ email: body.login }, { username: body.login }],
    });
    if (user && (await compareHash(body.password, user.password))) {
      //@ts-ignore
      user.password = undefined;
      const token = generateToken({
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        domain: ".localhost",
        maxAge: 7 * 1000 * 60 * 60 * 24,
      });
      return res.status(200).json({
        code: 200,
        status: "success",
        data: {
          user: user.toJSON(),
          token,
        },
      });
    }
    throw new Error("400::User not found");
  } catch (error) {
    next(error);
  }
};

export const register: Handler = async (req, res) => {
  const body: Omit<IUser, "_id"> = req.body;
  body.isAdmin = false;
  body.password = await hashString(body.password);
  const user = await User.create(body);
  if (user) {
    return res.status(201).json({
      code: 201,
      status: "success",
    });
  }
};

export const recover: Handler = (req, res) => {};
