import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

interface AuthRequest extends Request {
    user?: { userId: string };
}

// Send Friend Request
export const sendFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { IdToRequest } = req.body;
        const senderId = req.user?.userId;


        const receiver = await User.findOne({ username: IdToRequest });
        const sender = await User.findById(senderId);
        const receiverId = receiver?._id;

        if (senderId === receiverId) {
            res.status(400).json({ message: "You cannot send a friend request to yourself" });
            return;
        }

        if (!receiver || !sender) {
            res.status(404).json({ message: "User not found"});
            return;
        }

        const senderObj = new mongoose.Types.ObjectId(senderId);
        if (receiver.friendRequests.includes(senderObj)) {
            res.status(400).json({ message: "Friend request already sent" });
            return;
        }

        if (receiver.friends.includes(senderObj)) {
            res.status(400).json({ message: " Already a Friend" });
            return;
        }

        receiver.friendRequests.push(senderObj);
        await receiver.save();

        res.status(200).json({ message: "Friend request sent" });
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Accept Friend Request
export const acceptFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const receiverId = req.user?.userId;

        const receiver = await User.findById(receiverId);
        const sender = await User.findById(userId);

        if (!receiver || !sender) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (!receiver.friendRequests.includes(new mongoose.Types.ObjectId(userId))) {
            res.status(400).json({ message: "No friend request from this user" });
            return;
        }

        // Remove from pending requests
        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== userId);
        // Add to friends list
        receiver.friends.push(new mongoose.Types.ObjectId(userId));
        sender.friends.push(new mongoose.Types.ObjectId(receiverId));

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Pending Friend Requests
export const getFriendRequests = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.userId).populate("friendRequests", "username");

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ friendRequests: user.friendRequests });
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Friends List
export const getFriends = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.userId).populate("friends", "username");

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ friends: user.friends });
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Server error" });
    }
};
