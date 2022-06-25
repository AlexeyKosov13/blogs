
import { useNavigate, useLocation } from "react-router-dom";
import { UseAuth } from "../../Hook/UseAuth";
import "./LoginPage.css";

export const LoginPage = ({ setIsLoggedIn, setUserName, setIsAdmin }) => {
  // const [login, setLogin] = useState("");
  // const [password, setPassword] = useState("");

  const {signin} = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const fromPage = location.state?.from?.pathname || '/blog';
  const fromPage = '/blog';


 //====авторизация=====
  const handleLogIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const user = form.username.value;
    const password = form.password.value;

    signin(user, () => navigate(fromPage, {repalce: true}))

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('isAdmin', false);

    if(user === 'admin' ) {
      if (password === '123') {
        setIsAdmin(true);
      localStorage.setItem('isAdmin', true);
      } else {
        alert('Введите правилный логин или пароль!')
        return false
      }   
    }



    setUserName(user);
    setIsLoggedIn(true);
  };

  return (
    <div className="loginPage">
      <h2>Авторизация</h2>
      <form action="" className="loginForm" onSubmit={handleLogIn}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Логин"
            className="loginFormInput"
            required
           

          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            className="loginFormInput"
            required
           
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
