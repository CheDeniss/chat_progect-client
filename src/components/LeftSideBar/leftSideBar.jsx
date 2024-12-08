import React, {useState} from 'react';
import SearchAndMenuBar from "./searchAndMenuBar.jsx";
import ContactsList from "./contactsList.jsx";
import "../../styles/leftSideBar.css";

const LeftSideBar = ({ setActiveChat, setIsAuthenticated}) => {
    return(
        <div className="left-side-bar">
            <SearchAndMenuBar setIsAuthenticated={setIsAuthenticated}/>
            <ContactsList setActiveChat={setActiveChat} />
        </div>);
};

export default LeftSideBar;
