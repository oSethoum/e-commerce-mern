import { Handler } from "express";
import jwt from "jsonwebtoken";
import { HTTPError } from "../common/http-error";

export const tokenMiddleware: Handler = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new HTTPError(401, "malformed or expired token");
    }
    const secret = process.env.JWT_ACCESS_SECRET || "access-token";
    const result: any = jwt.verify(accessToken, secret);
    res.locals.userId = result.user._id;
    next();
  } catch {
    next(new HTTPError(401, "expired or malformed jwt"));
  }
};
