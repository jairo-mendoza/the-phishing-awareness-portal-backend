const express = require("express");
const router = express.Router();

const {
    postForumPost,
    getForumPosts,
    getForumPost,
    putForumPostComment,
} = require("../controllers/forumPostController");

console.log("Routed to forum post route");

router.post("/new-post", postForumPost);
// This is to get all the forum posts, will serve limited data to the frontend
// id, title, poster, content (only a certain amount), likes, tags, img
router.get("/all-posts", getForumPosts);
router.get("/:id", getForumPost);

router.put("/:id/add-comment", putForumPostComment);

module.exports = router;
