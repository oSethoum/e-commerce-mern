import express from "express";
import {
  createProduct,
  deleteProduct,
  findProduct,
  queryProduct,
  updateProduct,
} from "./product.controller";

const router = express.Router();

router.get("/:id", findProduct);
router.get("/", queryProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
