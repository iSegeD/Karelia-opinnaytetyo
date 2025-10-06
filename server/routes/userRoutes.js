import express from "express";

import {
  getUsers,
  getUser,
  changeAvatar,
  editUser,
} from "../controllers/userController.js";

import { userIdExtractor } from "../middleware/authMiddleware.js";

import { patchUserValidation } from "../middleware/validationsMiddleware.js";
import { handleValidationErrors } from "../middleware/handleValidationErrorsMiddleware.js";

import { uploadAvatar } from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post(
  "/change-avatar",
  userIdExtractor,
  uploadAvatar.single("avatar"),
  changeAvatar
);
router.patch(
  "/edit-user",
  userIdExtractor,
  patchUserValidation,
  handleValidationErrors("Fill in at least one field", 422),
  editUser
);

export default router;
