import React, {useEffect, useRef, useState} from 'react';
import user_icon from "../../assets/user.png";
import '../../styles/userManagement.css';
import socketService from "../../services/socketService.js";

const UserManagement = ({setIsAuthenticated}) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        // Додаємо слухач подій для кліків поза меню
        document.addEventListener('click', handleClickOutside);

        return () => {
            // Видаляємо слухач подій, коли компонент буде знищено
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        socketService.disconnect();
        console.log("Вихід із системи");
    };

    const handleShowMenu = () => {
        setShowMenu((prevState) => !prevState);
    };

    return (
        <div className="user-menu" ref={menuRef}>
            <div className="user-icon" onClick={handleShowMenu}>
                <img className="user-icon" src={user_icon} alt="User Icon" />

            </div>
            {showMenu && (
                <div className="menu-options">
                    <h4></h4>
                    <button className="btn btn-danger mt-2" onClick={handleLogout}>Вихід</button>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
