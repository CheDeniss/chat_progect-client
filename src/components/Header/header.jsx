import React, {useEffect, useState} from 'react';
import "../../styles/header.css";
import CanvasWindow from "./canvasWindow.jsx";
import socketService from "../../services/socketService.js";

const Header = ({authUserData, activeChat, setIsAuthenticated }) => {
    const [groupMembers, setGroupMembers] = useState('')

    useEffect(() => {
        const handleSetGroupMembers = (data) => {
            setGroupMembers(data.data.map((member) => member.name).join(', '));
        }
        socketService.on("setGroupMembers", handleSetGroupMembers);

        if(activeChat && activeChat.isGroup === '1'){
            socketService.send('getGroupMembers', {chatId: activeChat.id});
        }
        if(activeChat && activeChat.isGroup === '0'){
            setGroupMembers(`${activeChat.name}, ${authUserData.name}`);
        }
        return () => {
            socketService.off("setGroupMembers", handleSetGroupMembers);
        };
    }, [activeChat]);


    return (
        <>
            <div className="chat-header">
                <button className="btn btn-secondary"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample">&#9776;
                </button>
                <p>
                    {groupMembers ? `Учасники: ${groupMembers}` : "Чат не обрано..."}
                </p>
            </div>
            <div>
                <CanvasWindow authUserData={authUserData} setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </>
    );
};

export default Header;
