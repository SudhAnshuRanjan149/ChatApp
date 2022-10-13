const express = require("express");
const app = express();

const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const PORT = 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected with id : ", socket.id);

  socket.on("join_room", async (data) => {
    console.log("User Connect : ", data);
    await socket.join(data);
    console.log(
      `User Connected with id : ${socket.id} and joined room :  ${data}`
    );
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);

    let count = 0;
    // function sendRegularMessage(room, socket, data, count) {
    //   data.message = `Room id ${room} : ${count++}`;
    //   console.log(data);
    //   socket.to(room).emit("receive_message", data);
    // }
    // setInterval(() => sendRegularMessage(data.room, socket, data, count), 1000);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected with id : ", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
