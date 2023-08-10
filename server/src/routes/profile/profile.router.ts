import express from "express";
import * as controller from "./profile.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/", preservePath: true });
const router = express.Router();

router.patch(
  "/change-avatar",
  upload.single("avatar"),
  controller.changeAvatar
);
router.patch("/change-password", controller.changePassword);
router.patch("/update-information", controller.updateInformation);

export default router;
