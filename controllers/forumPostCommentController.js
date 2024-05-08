const ForumPostComment = require("../models/forum-post-comment");

exports.postForumPostComment = (req, res) => {
    const forumPostComment = new ForumPostComment(req.body);
    console.log("Creating new forum post comment...");

    forumPostComment
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Forum post comment created successfully",
                forumPostComment: forumPostComment,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: `Error creating forum post comment... \n ${err}`,
            });
        });
};
