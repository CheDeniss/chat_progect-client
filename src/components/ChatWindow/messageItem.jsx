import React from 'react';
import "../../styles/messageItem.css";
import socketService from "../../services/socketService.js";

const MessageItem = ({ activeChat, message, isMyMessage }) => {
    //console.log('message - MessageItem', message);
    //console.log('isSender - MessageItem', isMyMessage);

    const handleDelete = () => {
        console.log('delete');
        socketService.send("delMessage", message);
    }

    return (
        <div className={`message-item ${isMyMessage === "1" ? "message-receiver" : "message-sender"} message-item-container`}>
            <div className="message-meta">
                {isMyMessage === "0" ? <b className="message-author ">{message.senderName}</b> : <b className="message-author "> </b>}
                <button onClick={handleDelete} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <p className={`message-text-${isMyMessage === "1" ? "me" : "notme"}`}>
                {message.message}
            </p>

            <span className="message-timestamp">{message.created_at.slice(0,19)}</span>
        </div>
    );
};

export default MessageItem;

