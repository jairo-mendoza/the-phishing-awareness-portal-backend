const express = require("express");
const router = express.Router();

const { getAllComm } = require("../controllers/allCommController");

router.get("/", getAllComm);

module.exports = router;
