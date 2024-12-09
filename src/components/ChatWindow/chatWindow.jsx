import React from 'react';
import MessagesList from "./messagesList.jsx";
import MessageInput from "./messageInput.jsx";
import "../../styles/chatWindow.css";
import {useError} from "../ErrorModal/errorContext";
import SearchingMessages from "./searchingMessages.jsx";

const ChatWindow = ({activeChat}) => {
    const {showError} = useError();
    console.log("activeChat - ", activeChat);

    if (!activeChat) {
        return <div className="chat-window">Виберіть чат для початку спілкування</div>;
    }

    return (
        <div className="chat-window">
            <SearchingMessages activeChat={activeChat} />
            <MessagesList activeChat={activeChat} />
            <MessageInput activeChat={activeChat} />
        </div>
    );
};

export default ChatWindow;
