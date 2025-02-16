import express from "express";
import { createPost, getPosts, likePost, getPost, commentOnPost, sharePost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/posts", authMiddleware, createPost); // Create a post
router.get("/posts/feed", authMiddleware, getPosts); // Get all posts filtered by friends
router.get("/posts/:id", authMiddleware, getPost); // Get a single post
router.post("/posts/:postId/like", authMiddleware, likePost ); // Like a post
router.post("/posts/:postId/comment", authMiddleware, commentOnPost); // Comment on a post
router.post("/posts/:id/share", authMiddleware, sharePost); // Share a post

export default router;
