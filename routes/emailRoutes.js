const express = require("express");
const router = express.Router();

const { getEmail } = require("../controllers/emailController");

console.log("Routed to email route");

router.get("/", getEmail);

module.exports = router;
