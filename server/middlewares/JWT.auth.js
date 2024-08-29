const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
dotenv.config();

const authenticate = async (req, res, next) => {
  const header = req.header("authorization");

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const uid = new mongoose.Types.ObjectId(decoded.userId);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = authenticate;
