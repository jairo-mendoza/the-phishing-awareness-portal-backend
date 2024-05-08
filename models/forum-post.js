const mongoose = require("mongoose");
const postTags = require("../constants/postTags");

const ForumPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
        // TODO: Will have to go back on check on this
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // "User" is the name of the model that we are referencing
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
            required: true,
        },
        tags: {
            type: [String],
            validate: {
                validator: (tags) => tags.every((tag) => postTags.has(tag)),
                message: (props) => `${props.value} is not a valid tag!`,
            },
            required: false,
        },
        img: {
            type: String,
            required: false,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ForumPostComment",
                required: true,
            },
        ],
    },
    { timestamps: true }
);

const ForumPost = mongoose.model("ForumPost", ForumPostSchema);

module.exports = ForumPost;
