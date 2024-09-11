const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { dbConnect } = require("./Database/db.config");
const router = require("./Routers/routes");
const { setIo: setchatIO } = require("./Controllers/chat.controller");
const { setIo: setmsgIO } = require("./Controllers/msg.controller");
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

setchatIO(io);
setmsgIO(io);

dbConnect()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
