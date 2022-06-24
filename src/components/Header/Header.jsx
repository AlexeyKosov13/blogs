import React from "react";
import { NavLink } from "react-router-dom";
import { UseAuth } from "../../Hook/UseAuth";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Header.css";

export const Header = ({ isLogIn, setIsLoggedIn}) => {

  const {user} = UseAuth();
  const {signout} = UseAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signout(()=> navigate('/login'), {repalce: true} )
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('isAdmin', false);
    setIsLoggedIn(false);
  };

  return (
    <header className="mainHeader">
      {user ? 
        <nav>
          Добро пожаловать, &nbsp; <strong> {user}</strong>
          <NavLink onClick={() => handleLogOut()} to="/login" >
           Выход 
           <ExitToAppIcon/>
          </NavLink>
        </nav>
       : 
        "Вы не авторизированы"
      }
    </header>
  );
};
