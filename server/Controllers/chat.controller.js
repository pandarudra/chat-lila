const Chat = require("../Models/chat.model");
const User = require("../Models/user.model");

const Msg = require("../Models/msg.model");

const createchat = async (req, res) => {
  const { users } = req.body; // users should be an array of user IDs
  try {
    // Validate all users exist
    const validUsers = await User.find({ _id: { $in: users } });
    if (validUsers.length !== users.length) {
      return res
        .status(400)
        .json({ message: "One or more users do not exist" });
    }

    const chat = new Chat({ users });
    await chat.save();

    for (const userId of users) {
      const user = await User.findById(userId);
      if (!user.chats.includes(chat._id)) {
        user.chats.push(chat._id);
        await user.save();
      }
    }

    res.status(201).json({ message: "Chat created successfully", chat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createchat };
