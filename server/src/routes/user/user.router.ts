import express from "express";
import * as controller from "./user.controller";

const router = express.Router();

router.get("/:id", controller.findUser);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.get("/", controller.queryUser);
router.post("/", controller.createUser);

export default router;
