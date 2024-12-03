import React from 'react';
import "../../styles/messageInput.css";
import socketService from "../../services/socketService";

const MessageInput = ({ activeChat }) => {
    const [message, setMessage] = React.useState('');

    // Обробник відправлення повідомлення
    const handleSendMessage = () => {
        if (message.trim() && activeChat) {

            socketService.send("message", {  // Відправляємо повідомлення через SocketService
                chatId: activeChat.id,
                message: message.trim(),
                isGroup: activeChat.isGroup // Вказуємо, чи це груповий чат
            });

            //console.log(`Надіслано повідомлення: "${message}" до чату ${activeChat.name}`);
            setMessage(''); // Очищуємо поле після відправлення
        }
    };


return (
    <div className="input-group m-3 w-auto">
            <input
                className="form-control"
                type="text"
                placeholder="Написати повідомлення..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="btn btn-outline-secondary" onClick={handleSendMessage}>Надіслати</button>
        </div>
    );
};

export default MessageInput;
