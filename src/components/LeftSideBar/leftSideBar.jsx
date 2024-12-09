import React, {useState} from 'react';
import ContactsList from "./contactsList.jsx";
import "../../styles/leftSideBar.css";

const LeftSideBar = ({authUserData, setActiveChat, setIsAuthenticated}) => {
    return(
        <div className="left-side-bar">
            <ContactsList setActiveChat={setActiveChat} />
        </div>);
};

export default LeftSideBar;
