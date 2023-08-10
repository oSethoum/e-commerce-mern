import express, { Express, json } from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import productRouter from "./product/product.router";
import orderRouter from "./order/order.router";
import morgan from "morgan";
import * as middleware from "../middleware";
import cookieParser from "cookie-parser";

export const setupRoutes = (app: Express) => {
  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use("/auth", authRouter);
  const api = express.Router();
  api.use("/api/users", middleware.tokenMiddleware, userRouter);
  api.use("/api/products", productRouter);
  api.use("/api/orders", middleware.tokenMiddleware, orderRouter);
  // error middleware
  app.use(middleware.errorMiddleware);
};
