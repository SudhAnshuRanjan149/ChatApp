import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { SaveChatData } from "../Redux/Slice/ChatSlice";

import "./Chat.scss";

const Chat = () => {
  const dispatch = useDispatch();

  const [currentMessage, setCurrentMessage] = useState("");
  const Data = useSelector((state) => state.LoginSlice);
  const ChatData = useSelector((state) => state.ChatSlice);

  console.log("ChatData --> ", ChatData);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: Data.loginData.room,
        author: Data.loginData.username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await Data.loginData.socket.emit("send_message", messageData);
      dispatch(SaveChatData(messageData));
    }
  };

  useEffect(() => {
    Data.loginData.socket.on("receive_message", (data) => {
      console.log("receive_message: ", data);
      dispatch(SaveChatData(data));
    });
  }, [Data.loginData.socket]);

  return (
    <>
      <div className="chat-container">
        <div className="chat-header">
          <p>Live chat</p>
        </div>
        <div className="chat-body">
          {ChatData.data.map((d) => {
            if (d.author === Data.loginData.username) {
              return <div className="sender-message">{d.message}</div>;
            } else {
              return <div className="receiver-message">{d.message}</div>;
            }
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Write here..."
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
