import express, { Express, json } from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import productRouter from "./product/product.router";
import orderRouter from "./order/order.router";
import morgan from "morgan";
import * as middleware from "../middleware";

export const setupRoutes = (app: Express) => {
  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));

  const api = express.Router();
  // public routes
  app.use("/api/auth", authRouter);

  api.use(middleware.tokenMiddleware);
  // protected routes
  api.use("/users", userRouter);
  api.use("/products", productRouter);
  api.use("/orders", orderRouter);

  app.use("/api", api);
  // catch unhandled exceptions
  app.use(middleware.errorMiddleware);
};
