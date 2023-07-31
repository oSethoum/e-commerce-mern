import express from "express";
import {
  createOrder,
  deleteOrder,
  findOrder,
  queryOrder,
  updateOrder,
} from "./order.controller";

const router = express.Router();

router.get("/:id", findOrder);
router.get("/", queryOrder);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
