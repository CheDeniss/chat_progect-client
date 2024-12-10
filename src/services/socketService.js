//
// import {ErrorProvider} from "../components/ErrorModal/errorContext.jsx";
//
//
// class SocketService {
//     constructor() {
//         this.token = localStorage.getItem("token");
//         this.socket = null;
//         this.eventHandlers = {}; // Для обробників подій
//     }
//
//     // Ініціалізація WebSocket-з'єднання
//     connect(){
//         if (this.socket) {
//             console.warn("Спроба повторного підключення WebSocket - хрєн тобі.");
//             return
//         }
//
//         const url = this.token ? `ws://localhost:5237?token=${this.token}` : "ws://localhost:5237";
//
//         this.socket = new WebSocket(url);
//
//         console.log("WebSocket з'єднання встановлюється...");
//         console.log(this.socket);
//
//         this.socket.onopen = () => { // Обробник встановлення з'єднання
//             console.log("WebSocket з'єднання встановлено.");
//             this.triggerEvent("open");
//         };
//
//         this.socket.onmessage = (event) => { // Обробник отримання повідомлень
//             const data = JSON.parse(event.data);
//             console.log("Отримано повідомлення від сервера:", data);
//             this.triggerEvent(data.action, data);
//         };
//
//         this.socket.onclose = () => { // Обробник закриття з'єднання
//             console.log("WebSocket з'єднання закрито.");
//             this.triggerEvent("close");
//         };
//
//         this.socket.onerror = (error) => {  // Обробник помилок
//             console.error("Помилка WebSocket:", error);
//             ErrorProvider.showError("Помилка WebSocket.connect: " + error.message);
//         };
//     }
//
//     // Надсилання даних на сервер
//     send(action, payload) {
//         if (this.socket && this.socket.readyState === WebSocket.OPEN) {
//             const message = { action, data: payload };
//             this.socket.send(JSON.stringify(message));
//             console.log("Відправлено:", message);
//         } else {
//             console.error("WebSocket не підключений!");
//             ErrorProvider.showError("WebSocket.send: WebSocket не підключений!");
//         }
//     }
//
//     // Реєстрація подій
//     on(action, callback) {
//         if (!this.eventHandlers[action]) {
//             this.eventHandlers[action] = [];
//         }
//         this.eventHandlers[action].push(callback);
//     }
//
//     // Відписка від подій
//     off(action, callback) {
//         if (this.eventHandlers[action]) {
//             this.eventHandlers[action] = this.eventHandlers[action].filter(
//                 (cb) => cb !== callback
//             );
//         }
//     }
//
//     // Виклик подій
//     triggerEvent(action, data) {
//         if (this.eventHandlers[action]) {
//             this.eventHandlers[action].forEach((callback) => callback(data));
//         }
//     }
//
//     // Закриття з'єднання
//     disconnect() {
//         if (this.socket) {
//             this.socket.close();
//             this.socket = null;
//         }
//     }
//
//     // Перевірка стану з'єднання
//     isConnected() {
//         return this.socket && this.socket.readyState === WebSocket.OPEN;
//     }
// }
//
// // Експортуємо екземпляр класу для використання в проекті
// const socketService = new SocketService();
// export default socketService;



import { ErrorProvider } from "../components/ErrorModal/errorContext.jsx";


class SocketService {

    constructor() {
        this.token = localStorage.getItem("token") || '';
        this.socket = null;
        this.eventHandlers = {}; // Для обробників подій
    }

    showError(message) {
        ErrorProvider.showError(message);
    }

    // Ініціалізація WebSocket-з'єднання
    connect(){
        if (this.socket) {
            console.warn("WebSocket вже підключено.");
            return;
        }

        try {


            const url = this.token ? `ws://localhost:5237?token=${this.token}` : "ws://localhost:5237";

            this.socket = new WebSocket(url);
            console.log("WebSocket з'єднання встановлюється...");
            //console.log(this.socket);

            this.socket.onopen = () => { // Обробник встановлення з'єднання
                console.log("WebSocket з'єднання встановлено.");
                this.triggerEvent("open");
            };

            this.socket.onmessage = (event) => { // Обробник отримання повідомлень
                const data = JSON.parse(event.data);
                console.log("Отримано повідомлення від сервера:", data);
                this.triggerEvent(data.action, data);
            };

            this.socket.onclose = () => { // Обробник закриття з'єднання
                console.log("WebSocket з'єднання закрито.");
                this.triggerEvent("close");
            };

            this.socket.onerror = (error) => {  // Обробник помилок
                console.error("Помилка WebSocket:", error);
                //this.showError("Помилка WebSocket.connect: " + error.message);
            };

        } catch (error) {
            console.log("Помилка ініціалізації WebSocket:", error);
            //this.showError("Помилка ініціалізації WebSocket: " + error.message);
        }
    }

    // Надсилання даних на сервер
    send(action, payload) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const message = { action, data: payload };
            this.socket.send(JSON.stringify(message));
            console.log("Відправлено:", message);
        } else {
            console.error("WebSocket не підключений!");
            //this.showError("WebSocket.send: WebSocket не підключений!");
        }
    }

    // Реєстрація подій
    on(action, callback) {
        if (typeof callback !== "function") return;
        if (!this.eventHandlers[action]) {
            this.eventHandlers[action] = [];
        }
        this.eventHandlers[action].push(callback);
    }

    // Відписка від подій
    off(action, callback) {
        if (this.eventHandlers[action]) {
            this.eventHandlers[action] = this.eventHandlers[action].filter(
                (cb) => cb !== callback
            );
        }
    }

    // Виклик подій
    triggerEvent(action, data) {
        if (this.eventHandlers[action]) {
            this.eventHandlers[action].forEach((callback) => {
                try {
                    callback(data);
                } catch (error) {
                    //this.showError(`Помилка у обробнику події "${action}":`, error);
                }
            });
        }
    }

    // Закриття з'єднання
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    // Перевірка стану з'єднання
    isConnected() {
        return this.socket && this.socket.readyState === WebSocket.OPEN;
    }
}

// Експорт
const socketService = new SocketService();
export default socketService;