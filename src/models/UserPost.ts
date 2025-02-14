import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    content: { type: String, required: true },
    comments: [CommentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to User
    createdAt: { type: Date, default: Date.now },
    visibility : { type: String, default: "public" },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
