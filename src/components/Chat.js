import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import Message from "./Message";
import db from "../firebase";
import "./chat.css";
import { useStateValue } from "../StateProvider";

function Chat() {
  const [avatar, setAvatar] = useState();
  const [messages, setMessages] = useState([]);
  const { roomID } = useParams();
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    let num = Math.floor(Math.random() * 5000);
    let url = `https://avatars.dicebear.com/4.5/api/human/${num}.svg`;
    setAvatar(url);
  }, []);

  useEffect(() => {
    if (roomID) {
      db.collection("rooms")
        .doc(roomID)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data() ? snapshot.data().name : null);
        });

      db.collection("rooms")
        .doc(roomID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => {
              return { id: doc.id, data: doc.data() };
            })
          );
        });
      let num = Math.floor(Math.random() * 5000);
      let url = `https://avatars.dicebear.com/4.5/api/human/${num}.svg`;
      setAvatar(url);
    }
  }, [roomID]);

  const handelSendMessage = (e) => {
    e.preventDefault();
    setMessage("");
    db.collection("rooms")
      .doc(roomID)
      .collection("messages")
      .add({ name: user.displayName, message, timestamp: new Date() });
  };
  const handleWritingMessage = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {roomName !== null ? (
        <div className="chat">
          <div className="chat__header">
            <Avatar src={avatar} />
            <div className="chat__header__infos">
              <h3>{roomName}</h3>
              <p>
                {messages.length > 0
                  ? "Last seen at " +
                    new Date(
                      messages[messages.length - 1].data.timestamp?.toDate()
                    ).toLocaleString()
                  : "no messages"}
              </p>
            </div>
            <div className="chat__header__right">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chat__body">
            {messages.length > 0 &&
              roomID != undefined &&
              messages.map((message) => (
                <Message
                  key={message.id}
                  messageName={message.data.name}
                  messageContent={message.data.message}
                  timestamp={new Date(
                    message.data.timestamp?.toDate()
                  ).toLocaleString()}
                  isRecevier={message.data.name == user.displayName}
                />
              ))}
          </div>
          <div className="chat__footer">
            <IconButton>
              <InsertEmoticon />
            </IconButton>
            <form>
              <input
                onChange={handleWritingMessage}
                type="text"
                placeholder="Type a message"
                value={message}
              />
              <button onClick={handelSendMessage} type="submit">
                send
              </button>
            </form>
            <IconButton>
              <Mic />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="alert">This room does not exist</div>
      )}
    </>
  );
}

export default Chat;
