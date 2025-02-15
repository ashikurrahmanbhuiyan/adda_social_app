import { Request, Response } from "express";
import Post from "../models/UserPost";
import mongoose from "mongoose";

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

        // res.status(201).json({ message: "Post created successfully", post: newPost });
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all posts (with user details)
export const getPosts = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await Post.find().populate("userId", "username email"); // Get posts with user info
        // res.status(200).json(posts);
        res.render("feed", { posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single post

export const getPost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("userId", "username email");

        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Like a post
export const likePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        // Toggle like (if already liked, remove the like; otherwise, add it)
        if (post.likes.includes(new mongoose.Types.ObjectId(userId))) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(new mongoose.Types.ObjectId(userId));
        }

        await post.save();
        // res.status(200).json({ message: "Post liked/unliked", likes: post.likes.length });
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// Comment on a post
export const commentOnPost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        const comment = { userId, text, createdAt: new Date() };
        post.comments.push(comment);

        await post.save();
        // res.status(201).json({ message: "Comment added", comments: post.comments });
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error commenting on post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

