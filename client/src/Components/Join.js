import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import { useDispatch } from "react-redux";
import { SaveLoginData } from "../Redux/Slice/LoginSlice";
import {useNavigate} from "react-router-dom";

const socket = io.connect("http://localhost:3001");


const Join = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const navigate = useNavigate();

	const [userName, setUserName] = useState("");
	const [room, setRoom] = useState("");
  
	const joinRoom = () => {
	  if (userName !== "" && room !== "") {
		socket.emit("join_room", room);
		console.log("Joined room: " + room);
		const logindata = { "socket":socket, "username":userName, "room":room };
		dispatch(SaveLoginData(logindata));
		// history.push("/chat")
		navigate("/chat");
	  }
	};

  return (
    <>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="enter your name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter room id"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join A Room</button>

	  {/* <Chat socket={socket} username={userName} room={room} /> */}
    </>
  );
};

export default Join;
