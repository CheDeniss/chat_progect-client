import React, { useEffect, useState, useCallback } from 'react';
import './styles/App.css';
import Header from "./components/Header/header.jsx";
import ChatWindow from "./components/ChatWindow/chatWindow.jsx";
import LeftSideBar from "./components/LeftSideBar/leftSideBar.jsx";
import LoginForm from "./components/Auth/LoginForm.jsx";
import { jwtDecode } from 'jwt-decode';
import { useError } from "./components/ErrorModal/errorContext.jsx";
import socketService from "./services/socketService.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    const [activeChat, setActiveChat] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [title, setTitle] = useState('Вхід не виконаний.');
    const [authUserData, setAuthUserData] = useState(null); // Зберігаємо дані користувача
    const [isWebSocketReady, setIsWebSocketReady] = useState(false); // Стан готовності WebSocket
    const { showError } = useError();

    const validateToken = useCallback((token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) throw new Error("Термін дії токена сплив");
            return decoded;
        } catch {
            return null;
        }
    }, []);

    const initializeWebSocket = (token) => {
        console.log(" initializeWebSocket(token)")
        return new Promise((resolve, reject) => {
            if (socketService.isConnected()) {
                console.warn("WebSocket вже підключено.");
                setIsWebSocketReady(true); // WS готовий
                resolve();
                return;
            }

            socketService.connect(token);

            socketService.on("open", () => {
                setIsWebSocketReady(true); // WS готовий
                resolve();
            });

            socketService.on("error", (error) => {
                console.error("Помилка WebSocket:", error);
                reject(error);
            });
        });
    };

    const getUserData = useCallback(() => {
        const handleSetUserData = (data) => {
            console.log("Дані користувача: ", data);
            setAuthUserData(data.data);
            setTitle(data.data.name); // Оновлення заголовку
        };

        socketService.on("setUserData", handleSetUserData);
        socketService.send("getUserData", {});

        return () => {
            socketService.off("setUserData", handleSetUserData);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = validateToken(token);

        if (decoded) {
            setIsAuthenticated(true);
            initializeWebSocket(token)
                .then(() => {
                    getUserData(); // Отримуємо дані користувача після WS-з'єднання
                })
                .catch(() => {
                    showError("Не вдалося підключитися до сервера.");
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                });
        } else {
            if (!socketService.isConnected()) {
                socketService.connect();
            }

            localStorage.removeItem('token');
            setIsAuthenticated(false);
            showError('Сесія закінчилася або токен недійсний. Авторизуйтеся знову.');
        }
    }, [validateToken, getUserData, showError]);

    useEffect(() => {
        if (title) {
            document.title = activeChat ? `${title} - ${activeChat.name}` : title;
        }
    }, [title, activeChat]);

    if (!isAuthenticated) {
        return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
    }

    if (!isWebSocketReady || !authUserData) {
        return <div className="loader"></div>
    }

    return (
        <div className="app">
            <Header activeChat={activeChat} setIsAuthenticated={setIsAuthenticated} />
            <div className="app-body">
                <LeftSideBar setActiveChat={setActiveChat} setIsAuthenticated={setIsAuthenticated} />
                <ChatWindow activeChat={activeChat} />
            </div>
        </div>
    );
}

export default App;
