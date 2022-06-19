const express = require('express');
const app = express();

const http = require('http');
const cors = require("cors");

//

const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	}
});


io.on("connection", (socket) => {
	console.log("User Connected with id : ", socket.id);

	socket.on("join_room",async(data) => {
		console.log("User Connect")
		await socket.join(data);
		console.log(`User Connected with id : ${socket.id} and joined room :  ${data}`);
	})

	socket.on("send_message", (data) => {
		console.log(data);
		socket.to(data.room).emit("receive_message" , data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected with id : ", socket.id);
	})
});

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
})


app.get('/', (req, res) => {
	res.send('Hello world')
})



