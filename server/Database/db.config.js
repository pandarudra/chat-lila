const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    if (error.reason && error.reason.servers) {
      console.error(
        "Server details:",
        Array.from(error.reason.servers.values())
      );
    }
  }
};

module.exports = { dbConnect };
