import { Express, json } from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import productRouter from "./product/product.router";
import orderRouter from "./order/order.router";
import profileRouter from "./profile/profile.router";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as middleware from "../middleware";

export const setupRoutes = (app: Express) => {
  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use("/auth", authRouter);

  app.use("/api/profile", middleware.tokenMiddleware, profileRouter);
  app.use("/api/users", middleware.tokenMiddleware, userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/orders", middleware.tokenMiddleware, orderRouter);

  app.use(middleware.errorMiddleware);
};
