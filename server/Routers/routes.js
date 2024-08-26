const express = require("express");
const { signup, login, addContact } = require("../Controllers/user.controller");
const { createchat } = require("../Controllers/chat.controller");
const { sendmsg } = require("../Controllers/msg.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/addContact", addContact);
router.post("/createchat", createchat);
router.post("/sendmsg", sendmsg);

module.exports = router;
