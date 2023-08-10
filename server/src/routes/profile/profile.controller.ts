import { Handler } from "express";
import User from "../user/user.model";
import { HTTPError } from "../../common/http-error";
import { rename } from "fs/promises";
import { extname, join } from "path";

export const changeAvatar: Handler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new HTTPError(400, "avatar missing");
    }
    const filename = req.file.filename + extname(req.file.originalname);
    await rename(join("uploads", req.file.filename), join("uploads", filename));
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

export const updateInformation: Handler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const changePassword: Handler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
