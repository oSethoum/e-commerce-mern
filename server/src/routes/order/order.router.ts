import express from "express";
import * as controller from "./order.controller";

const router = express.Router();

router.get("/:id", controller.findOrder);
router.get("/", controller.queryOrder);
router.post("/", controller.createOrder);
router.patch("/:id", controller.updateOrder);
router.delete("/:id", controller.deleteOrder);

export default router;
