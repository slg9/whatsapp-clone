import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import db from "../firebase";
import "./item.css";
function SidebarChatItem({ name, id, AddNewChat }) {
  const createNewChat = (e) => {
    const roomName = prompt("Pleaase enter name for chat !");
    if (roomName) {
      db.collection("rooms").add({ name: roomName });
    }
  };

  const [avatar, setAvatar] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  useEffect(() => {
    let num = Math.floor(Math.random(0, 1) * 5000);
    let url = `https://avatars.dicebear.com/4.5/api/human/${num}.svg`;
    setAvatar(url);
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setLastMessage(snapshot.docs.map((doc) => doc.data())[0]);
        });
    }
  }, [id]);
  return (
    <Link to={`/rooms/${id}`}>
      <div>
        {!AddNewChat ? (
          <div className="item">
            <Avatar src={avatar} />
            <div className="item__infos">
              <h2>{name}</h2>
              <p>{lastMessage ? lastMessage.message : ""}</p>
            </div>
            <div className="item__right">
              <p>
                {lastMessage
                  ? new Date(lastMessage.timestamp.toDate())
                      .toLocaleString()
                      .split(",")[0]
                  : ""}
              </p>
            </div>
          </div>
        ) : (
          <div className="item" onClick={createNewChat}>
            <h2>Add New CHAT</h2>
          </div>
        )}
      </div>
    </Link>
  );
}

export default SidebarChatItem;
