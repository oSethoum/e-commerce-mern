import express from "express";
import * as controller from "./order.controller";

const router = express.Router();

router.get("/", controller.queryOrder);
router.get("/:id", controller.findOrder);
router.post("/", controller.createOrder);
router.patch("/:id", controller.updateOrder);
router.delete("/:id", controller.deleteOrder);

export default router;
