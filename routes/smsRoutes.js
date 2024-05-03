const express = require("express");
const router = express.Router();

const { getSMS } = require("../controllers/smsController");

console.log("Routed to sms route");

router.get("/", getSMS);

module.exports = router;
