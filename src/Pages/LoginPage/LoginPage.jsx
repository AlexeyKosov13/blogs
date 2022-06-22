import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = ({ setIsLoggedIn, setUserName }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogIn = (e) => {
    e.preventDefault();

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', login);

    setUserName(login);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="loginPage">
      <h2>Авторизация</h2>
      <form action="" className="loginForm" onSubmit={handleLogIn}>
        <div>
          <input
            type="text"
            placeholder="Логин"
            className="loginFormInput"
            required
            onChange={handleLoginChange}

          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            className="loginFormInput"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
