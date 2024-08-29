const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
dotenv.config();

const reissue = async (req, res, next) => {
  const user = req.user;
  const token = jwt.sign(
    { email: user.email, userId: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.setHeader("Authorization", `Bearer ${token}`);
  next();
};

module.exports = reissue;
