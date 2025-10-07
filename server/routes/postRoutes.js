import express from "express";

import {
  getPosts,
  getPost,
  getPostForEdit,
  getUserPosts,
  getTagPost,
  createPost,
  editPost,
  deletePost,
  addComment,
  deleteComment,
} from "../controllers/postController.js";

import { userIdExtractor } from "../middleware/authMiddleware.js";

import {
  postValidation,
  pathPostValidation,
  commentValidation,
} from "../middleware/validationsMiddleware.js";
import { handleValidationErrors } from "../middleware/handleValidationErrorsMiddleware.js";

import { uploadThumbnail } from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/:id/edit", getPostForEdit);
router.get("/users/:id", getUserPosts);
router.get("/tags/:tag", getTagPost);
router.post(
  "/",
  userIdExtractor,
  uploadThumbnail.single("thumbnail"),
  postValidation,
  handleValidationErrors(
    "Please fill in the title, description and upload a post thumbnail",
    422
  ),
  createPost
);
router.patch(
  "/:id",
  userIdExtractor,
  uploadThumbnail.single("thumbnail"),
  pathPostValidation,
  handleValidationErrors("Fill in at least one field", 422),
  editPost
);
router.patch(
  "/:id/comments",
  userIdExtractor,
  commentValidation,
  handleValidationErrors("Please write a commnet", 422),
  addComment
);
router.delete("/:id/comments/:commentId", userIdExtractor, deleteComment);
router.delete("/:id", userIdExtractor, deletePost);

export default router;
