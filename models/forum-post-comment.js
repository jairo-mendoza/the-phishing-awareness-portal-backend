const mongoose = require("mongoose");

const ForumPostCommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ForumPost",
            required: true,
        },
        commentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    { timestamps: true }
);

const ForumPostComment = mongoose.model(
    "ForumPostComment",
    ForumPostCommentSchema
);

module.exports = ForumPostComment;
