import express from 'express';
import { createPost, userPosts, imageUpload } from '../controllers/postController';
import { verifyUser } from '../middlewares/auth';
import formidable from "express-formidable"

const router = express.Router();

router.post("/create-post", verifyUser, createPost)
router.get("/user-posts",verifyUser, userPosts)
router.post("/image-upload",verifyUser, formidable({maxFieldsSize:6 * 1024 *1024}), imageUpload)



export default router;
