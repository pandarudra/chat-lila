const express = require("express");
const {
  signup,
  login,
  addContact,

  getinfo,
} = require("../Controllers/user.controller");
const { createchat, getChats } = require("../Controllers/chat.controller");
const { sendmsg } = require("../Controllers/msg.controller");
const authenticate = require("../middlewares/JWT.auth");
const reissue = require("../middlewares/reissue.JWT");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/addContact", authenticate, addContact);
router.post("/createchat/:userid", authenticate, reissue, createchat);
router.post("/sendmsg", authenticate, sendmsg);
router.get("/getinfo/:id", getinfo);
router.get("/getchats/:id", getChats);

module.exports = router;
