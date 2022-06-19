import "./App.css";
import Chat from "./Components/Chat";
import Join from "./Components/Join";
import React, { useState } from "react";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      console.log("Joined room: " + room);
    }
  };

  return (
    <div className="App">
      <Join setUserName={setUserName} setRoom={setRoom} joinRoom={joinRoom} />
      <Chat socket={socket} username={userName} room={room} />
    </div>
  );
}

export default App;
