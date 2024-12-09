import socketService from "../../services/socketService.js";
import { useEffect, useState } from "react";
import "../../styles/loginForm.css";

const LoginForm = ({ setIsAuthenticated, setActiveChat }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [eMail, setEMail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        socketService.on('login', (data) => {
            if (data.status === 'success') {
                const token = data.data.token;

                // Зберігаємо токен
                localStorage.setItem('token', token);

                console.log('Токен збережено:', token);

                setIsAuthenticated(true);
            } else {
                console.error('Помилка входу:', data.message);
                alert(data.message);
            }
        });

        return () => {
            socketService.off('login');
        };
    }, [setIsAuthenticated]);

    const handleLogin = async (credentials) => {
        setActiveChat(null);
        socketService.send("login", {
            userName: credentials.userName,
            password: credentials.password
        });
    };

    const handleRegister = async (credentials) => {
        setActiveChat(null);
        socketService.send("register", {
            userName: credentials.userName,
            password: credentials.password,
            eMail: credentials.eMail
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            handleRegister({ userName, password, eMail });
        } else {
            handleLogin({ userName, password });
        }
    };

    return (
        <form className="logreg-container" onSubmit={handleSubmit}>
            <div className="logreg-form">
                <h1>{isRegistering ? "Реєстрація" : "Вхід"}</h1>
                <label htmlFor="login" className="form-label">Ім'я</label>
                <input
                    className="form-control mb-4"
                    required
                    id="login"
                    type="text"
                    placeholder="Логін"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="password" className="form-label">Пароль</label>
                <input
                    className="form-control mb-4"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegistering && (
                    <>
                        <label htmlFor="e-mail" className="form-label mt-2">E-Mail</label>
                        <input
                            className="form-control mb-4"
                            id="e-mail"
                            type="text"
                            required
                            placeholder="E-Mail"
                            value={eMail}
                            onChange={(e) => setEMail(e.target.value)}
                        />
                    </>
                )}
                <button className="btn btn-primary" type="submit">
                    {isRegistering ? "Зареєструватися" : "Увійти"}
                </button>
                {!isRegistering && (
                    <button
                        className="btn btn-link mt-2"
                        type="button"
                        onClick={() => setIsRegistering(true)}
                    >
                        Зареєструватися
                    </button>
                )}
            </div>
        </form>
    );
}

export default LoginForm;
