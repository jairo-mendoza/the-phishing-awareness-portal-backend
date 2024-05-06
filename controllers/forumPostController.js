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

/* TODO: Implement later */
exports.getForumPost = (req, res) => {};
