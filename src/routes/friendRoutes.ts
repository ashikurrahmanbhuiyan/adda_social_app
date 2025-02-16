import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { sendFriendRequest, acceptFriendRequest, getFriendRequests, getFriends } from "../controllers/friendController";

const router = express.Router();

router.post("/friend-request-sent", authMiddleware, sendFriendRequest); // Send request
router.post("/friend-request/:userId/accept", authMiddleware, acceptFriendRequest); // Accept request
router.get("/friend-requests", authMiddleware, getFriendRequests); // Get pending requests
router.get("/friends", authMiddleware, getFriends); // Get friends list

export default router;
