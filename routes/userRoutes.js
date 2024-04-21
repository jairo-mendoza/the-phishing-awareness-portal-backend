const express = require("express");
const router = express.Router();

const {
    loginUser,
    registerUser,
    getUser,
} = require("../controllers/userController");

console.log("Routed to user route");

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/", getUser);

module.exports = router;
