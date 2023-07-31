import express from "express";
import * as controller from "./user.controller";

const router = express.Router();

router.get("/:id", controller.findUser);
router.get("/", controller.queryUser);
router.post("/", controller.createUser);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
