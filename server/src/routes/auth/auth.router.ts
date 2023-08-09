import express from "express";
import * as controller from "./auth.controller";

const router = express.Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/recover", controller.recover);
router.post("/refresh", controller.refresh);

export default router;
