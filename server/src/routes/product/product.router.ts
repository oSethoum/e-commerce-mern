import express from "express";
import * as controller from "./product.controller";
import * as middleware from "../../middleware";

const router = express.Router();

router.get("/:id", controller.findProduct);
router.get("/", controller.queryProduct);
router.post("/", middleware.tokenMiddleware, controller.createProduct);
router.patch("/:id", middleware.tokenMiddleware, controller.updateProduct);
router.delete("/:id", middleware.tokenMiddleware, controller.deleteProduct);

export default router;
