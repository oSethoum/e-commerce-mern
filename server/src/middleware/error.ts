import { Response } from "express";

export const errorMiddleware = (error, _, res: Response, __) => {
  let statusCode = 500;
  let message = error.message || "Internal Server Error";

  if (error.name == "CastError") {
    statusCode = 400;
  }

  if (error.name == "HTTPError") {
    if (res.locals.logout) {
      res.clearCookie("refresh-token");
    }
    statusCode = error.statusCode;
  }

  return res.status(statusCode).json({
    statusCode,
    status: "error",
    message,
  });
};
