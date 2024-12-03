import React from 'react';
import "../../styles/header.css";

const Header = ({ activeChat, setIsAuthenticated }) => {
    return (
        <div className="chat-header">



            <p>
                Учасники: {activeChat?.username || "Невідомо"}
            </p>
        </div>
    );
};

export default Header;
