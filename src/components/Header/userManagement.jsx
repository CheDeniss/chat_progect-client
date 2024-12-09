import React, {useEffect, useRef, useState} from 'react';
import user_icon from "../../assets/user.png";
import '../../styles/userManagement.css';
import socketService from "../../services/socketService.js";

const UserManagement = ({setIsAuthenticated}) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        socketService.send("logout", {});
        console.log("Вихід із системи");
    }; 


    return (
        <div className="d-flex justify-content-between mx-3" >
            <div className="user-icon" >
                <img className="user-icon" src={user_icon} alt="User Icon" />
            </div>

                <button className="btn btn-danger mt-2" onClick={handleLogout}>Вихід</button>
        </div>
    );
};

export default UserManagement;
