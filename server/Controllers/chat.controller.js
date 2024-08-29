const Chat = require("../Models/chat.model");
const User = require("../Models/user.model");
const mongoose = require("mongoose");

const Msg = require("../Models/msg.model");

const createchat = async (req, res) => {
  const { userid } = req.body;

  const loggedInUserId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const existingChat = await Chat.findOne({
    users: { $all: [user1._id, user2._id] },
  });

  if (existingChat) {
    return res.status(200).json({ chat: existingChat });
  }

  try {
    const user1 = await User.findById(loggedInUserId);
    const user2 = await User.findById(userid);
    if (!user1 || !user2) {
      return res.status(404).json({ message: "User not found" });
    }
    const chat = new Chat({
      users: [user1._id, user2._id],
      msgs: [],
    });
    user1.chats.push(chat._id);
    user2.chats.push(chat._id);
    await user1.save();
    await user2.save();

    await chat.save();
    res.status(201).json({ chat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createchat };
