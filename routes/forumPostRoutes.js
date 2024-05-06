const express = require("express");
const router = express.Router();

const {
    postForumPost,
    getForumPost,
} = require("../controllers/forumPostController");

console.log("Routed to forum post route");

router.post("/new-post", postForumPost);

module.exports = router;
