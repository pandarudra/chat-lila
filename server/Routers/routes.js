const express = require("express");
const { signup, login, addContact } = require("../Controllers/user.controller");
const { createchat } = require("../Controllers/chat.controller");
const { sendmsg } = require("../Controllers/msg.controller");
const authenticate = require("../middlewares/JWT.auth");
const reissue = require("../middlewares/reissue.JWT");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/addContact", authenticate, addContact);
router.post("/createchat/:userid", authenticate, reissue, createchat);
router.post("/sendmsg", authenticate, sendmsg);

module.exports = router;
