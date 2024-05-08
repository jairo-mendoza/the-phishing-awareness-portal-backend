const express = require("express");
const router = express.Router();

const {
    postForumPostComment,
} = require("../controllers/forumPostCommentController");

console.log("Routed to forum post comment route");

router.post("/new-comment", postForumPostComment);

module.exports = router;
