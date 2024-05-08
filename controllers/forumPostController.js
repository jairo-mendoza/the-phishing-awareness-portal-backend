const ForumPost = require("../models/forum-post");

exports.postForumPost = (req, res) => {
    const forumPost = new ForumPost(req.body);
    console.log("Creating new forum post...");

    forumPost
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Forum post created successfully",
                forumPost: forumPost,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: `Error creating forum post... \n ${err}`,
            });
        });
};

// Method for the post preview
exports.getForumPosts = (req, res) => {
    console.log("Getting forum posts...");
    // Get all forum posts
    ForumPost.find({})
        .populate("poster", "userName") // populate 'poster' field with 'username' from the referenced document
        .select("-comments -createdAt") // exclude 'comments' and 'createdAt' field from the query results
        .then((forumPosts) => {
            res.status(200).json({ forumPosts: forumPosts });
        })
        .catch((err) => {
            res.status(500).json({
                message: `Error getting forum posts...`,
            });
        });
};

// Method for a more detailed post
exports.getForumPost = (req, res) => {
    ForumPost.findById(req.params.id)
        .populate("poster", "userName")
        .populate({
            path: "comments",
            populate: { path: "commentor", select: "userName" },
        })
        .then((forumPost) => {
            res.status(200).json({ forumPost: forumPost });
        })
        .catch((err) => {
            res.status(500).json({
                message: `Error getting forum post...${err}`,
            });
        });
};

// Method for putting comments on a post
exports.putForumPostComment = (req, res) => {
    const { commentId } = req.body;

    console.log(`Pushing comment id ${commentId} to post...`);

    ForumPost.findByIdAndUpdate(req.params.id, {
        $push: { comments: commentId },
    })
        .then(() => res.json({ message: "Comment added to post" }))
        .catch((err) =>
            res.status(500).json({ message: `Error adding comment to post...` })
        );
};
