import express from "express";
import {
  createPost,
  userPosts,
  imageUpload,
  editPost,
  postUpdate,
  postDelete,
} from "../controllers/postController";
import {
  verifyUser,
  verifyUserToUpdateOrDeletePost,
} from "../middlewares/auth";
import formidable from "express-formidable";

const router = express.Router();

// authenticate
router.use(verifyUser);

// routes
router.post("/create-post", createPost);
router.get("/user-posts", userPosts);
router.get("/:postId", editPost);
router.patch("/post-edit/:postId", postUpdate);
router.delete("/post-delete/:postId", postDelete);
router.post(
  "/image-upload",
  formidable({ maxFieldsSize: 6 * 1024 * 1024 }),
  imageUpload
);

export default router;
