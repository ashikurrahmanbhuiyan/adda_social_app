import express from "express";
import { createPost, getPosts, likePost, getPost} from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/posts", authMiddleware, createPost); // Create a post
router.get("/posts", authMiddleware, getPosts); // Get all posts
router.get("/posts/:id", authMiddleware, getPost); // Get a single post
router.post("/posts/:postId/like", authMiddleware, likePost ); // Like a post
router.post("/posts/:postId/comment", authMiddleware, ); // Comment on a post


export default router;
