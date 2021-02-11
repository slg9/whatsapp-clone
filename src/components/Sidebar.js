import React, { useState, useEffect } from "react";

import { Avatar, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import SidebarChatItem from "./SidebarChatItem";
import db from "../firebase";
import "./sidebar.css";
import { useStateValue } from "../StateProvider";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__left">
          <Avatar src={user?.photoURL} />
        </div>
        <div className="sidebar__header__right">
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search__box">
          <Search />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar__chat">
        <SidebarChatItem AddNewChat />
        {rooms.map((room) => (
          <SidebarChatItem id={room.id} key={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
