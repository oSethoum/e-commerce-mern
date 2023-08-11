import { Handler } from "express";
import User from "../user/user.model";
import { HTTPError } from "../../common/http-error";
import { rename } from "fs/promises";
import { extname, join } from "path";
import { compare, hash } from "bcrypt";
import { Input, parse } from "valibot";
import * as validator from "./profile.validator";

export const changeAvatar: Handler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new HTTPError(400, "avatar missing");
    }
    const filename = req.file.filename + extname(req.file.originalname);
    await rename(
      join("uploads", "images", "profile", req.file.filename),
      join("uploads", "images", "profile", filename)
    );
    const user = await User.findByIdAndUpdate(res.locals.userId, {
      $set: { avatar: filename },
    });
    res.status(200).json({
      statusCode: 200,
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInformation: Handler = async (req, res, next) => {
  try {
    const body: Input<typeof validator.updateInformationBodySchema> = req.body;
    parse(validator.updateInformationBodySchema, body);
    await User.updateOne(
      { id: res.locals.userId },
      {
        $set: { ...body },
      }
    );
    res.status(200).json({
      statusCode: 200,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword: Handler = async (req, res, next) => {
  try {
    const body: Input<typeof validator.changePasswordBodySchema> = req.body;
    parse(validator.changePasswordBodySchema, body);
    if (body.newPassword != body.newPasswordConfirm) {
      throw new HTTPError(400, "password don't match");
    }
    const user = await User.findById(res.locals.userId);
    if (!user) {
      throw new HTTPError(400, "user don't exist"); // possible redirect to logout
    }
    if (await compare(body.password, user.password)) {
      throw new HTTPError(400, "old password don't match");
    }
    await User.updateOne(
      { id: res.locals.userId },
      { $set: { password: await hash(body.newPassword, 7) } }
    );
    res.status(200).json({
      statusCode: 200,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
