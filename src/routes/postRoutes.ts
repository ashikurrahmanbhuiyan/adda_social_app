import express from "express";
import { createPost, getPosts } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/posts", authMiddleware, createPost); // Create a post
router.get("/posts", authMiddleware, getPosts); // Get all posts

export default router;
