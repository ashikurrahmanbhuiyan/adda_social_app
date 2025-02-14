import { Request, Response } from "express";
import Post from "../models/UserPost";

interface AuthRequest extends Request {
    user?: { userId: string };
}

// Create a post
export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const { content } = req.body;
        const userId = req.user?.userId; // Extract user ID from JWT

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }

        const newPost = new Post({ userId, content });
        await newPost.save();

        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all posts (with user details)
export const getPosts = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await Post.find().populate("userId", "username email"); // Get posts with user info
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

