import { Handler } from "express";
import { verifyToken } from "../utils/jwt";

export const tokenMiddleware: Handler = async (req, res, next) => {
  let auth = req.headers.authorization;
  if (auth && auth.split(" ").length == 2) {
    const token = auth.split(" ")[1];
    const result = await verifyToken(token);
    if (result != null) {
      next();
    }
  }

  return res.status(401).json({
    code: 401,
    status: "error",
    error: "missing or malformed access token",
  });
};
