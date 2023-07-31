import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  req,
  res
) => {
  if (error.message.includes("::")) {
    const [code, message] = error.message.split("::");
    return res.status(parseInt(code)).json({
      code: parseInt(code),
      status: "error",
      message,
    });
  }
  res.status(500).json({
    code: 500,
    status: "error",
    message: error.message,
  });
};
