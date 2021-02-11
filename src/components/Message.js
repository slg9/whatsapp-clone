import React from "react";
import "./message.css";
function Message({messageName,messageContent,timestamp,isRecevier}) {
  return (
    <p className={`chat__message ${isRecevier && `chat__receiver`}`}>
      <span className={`chat__message__name ${isRecevier && `chat__message__name__receiver`}`}>{messageName}</span>
      {messageContent}
      <span className="chat__message__timestamp">{timestamp}</span>
    </p>
  );
}

export default Message;
