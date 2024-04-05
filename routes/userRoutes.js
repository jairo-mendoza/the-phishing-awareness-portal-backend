const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userController");

console.log("Routed to user route");

router.post("/register-user", registerUser);

module.exports = router;
