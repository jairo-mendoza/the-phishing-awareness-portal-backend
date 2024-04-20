const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userController");
const { loginUser } = require("../controllers/userController");

console.log("Routed to user route");

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);

module.exports = router;
