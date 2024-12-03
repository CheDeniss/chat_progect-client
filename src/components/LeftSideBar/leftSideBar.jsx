import React, {useState} from 'react';
import SearchAndMenuBar from "./searchAndMenuBar.jsx";
import ContactsList from "./contactsList.jsx";
import "../../styles/leftSideBar.css";

const LeftSideBar = ({activeChat, setActiveChat, setIsAuthenticated}) => {
    return(
        <div className="left-side-bar">
            <SearchAndMenuBar setIsAuthenticated={setIsAuthenticated}/>
            <ContactsList activeChat={activeChat} setActiveChat={setActiveChat} />
        </div>);
};

export default LeftSideBar;
