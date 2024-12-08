import React, {useEffect} from 'react';
import "../../styles/messagesList.css";
import socketService from "../../services/socketService.js";
import MessageItem from "./messageItem.jsx";


const MessagesList = ({ activeChat }) => {

    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        const handleSetMessages = (data) => {
            setMessages(data.data);
        };

        const handleNewMessage = (newMessage) => {
            //console.log("newMessage7777777", newMessage)
            //console.log("activeChat.id", activeChat.id);
            if (newMessage.data.receiver_id === activeChat.id ||
                newMessage.data.sender_id === activeChat.id ||
                newMessage.data.chat_room_id === activeChat.id) {
                setMessages((prevMessages) => [...prevMessages, newMessage.data]);
                //console.log("newMessage.data", newMessage.data);
            }
        };

        const handleMessageDeleted = (messageId) => {
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.id !== messageId.data) // Видаляємо повідомлення з локального стану
            );
        };

        socketService.on("setMessages", handleSetMessages);
        socketService.on("newMessage", handleNewMessage);
        socketService.on("messageDeleted", handleMessageDeleted);

        socketService.send("getMessages", { chatId: activeChat.id, isGroup: activeChat.isGroup});

        return () => {
            socketService.off("setMessages", handleSetMessages);
            socketService.off("newMessage", handleNewMessage);
            socketService.off("messageDeleted", handleMessageDeleted);
        };
    }, [activeChat]);


    useEffect(() => {
        const list = document.querySelector('.messages-list');
        if (list) {
            list.scrollTop = list.scrollHeight;
        }
    }, [messages]); // Скролл до низу при зміні масиву повідомлень


console.log("messages messList", messages);
    return (
        <div className="messages-list">
            {messages.map((msg) => (
                <MessageItem activeChat={activeChat} key={msg.id} message={msg} isMyMessage={msg.isMyMessage} />
            ))}
        </div>
    );
};

export default MessagesList;
