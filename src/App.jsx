import { useEffect, useState } from 'react';
import './styles/App.css';
import Header from "./components/Header/header.jsx";
import ChatWindow from "./components/ChatWindow/chatWindow.jsx";
import LeftSideBar from "./components/LeftSideBar/leftSideBar.jsx";
import LoginForm from "./components/Auth/LoginForm.jsx";
import {jwtDecode} from 'jwt-decode';
import { useError } from "./components/ErrorModal/errorContext.jsx";
import socketService from "./services/socketService.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    const [activeChat, setActiveChat] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { showError } = useError();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // Декодуємо токен і перевіряємо термін дії
                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000); // Поточний час у секундах

                if (decoded.exp < currentTime) {
                    // Якщо термін дії токена сплив
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    showError('Сесія закінчилася. Авторизуйтеся знову.');
                } else {
                    // Токен валідний
                    setIsAuthenticated(true);

                    // Підключаємо WebSocket
                    socketService.connect(token);

                    // Реєстрація обробників подій WebSocket
                    socketService.on("open", () => {
                        console.log("WebSocket-з'єднання встановлено.");
                    });

                    socketService.on("message", (data) => {
                        console.log("Отримано повідомлення:", data);
                    });

                    socketService.on("error", (error) => {
                        console.error("Помилка WebSocket:", error);
                        showError("Помилка WebSocket: " + error.message);
                    });
                }
            } catch (error) {
                // Некоректний токен
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                showError('Некоректний токен -> видалений.');
            }
        }
        // else {
        //     socketService.connect();
        // }

        // Очищення WebSocket підключення при розмонтуванні
        return () => {
            socketService.off("open");
            socketService.off("message");
            socketService.off("error");
        };
    }, [showError]);

    // Якщо користувач неавторизований, показуємо форму входу
    if (!isAuthenticated) {
        socketService.connect();
        return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
    }

    return (
        <div className="app">
            <Header activeChat={activeChat} setIsAuthenticated={setIsAuthenticated} />
            <div className="app-body">
                <LeftSideBar setActiveChat={setActiveChat} setIsAuthenticated={setIsAuthenticated}/>
                <ChatWindow activeChat={activeChat} />
            </div>
        </div>
    );
}

export default App;
