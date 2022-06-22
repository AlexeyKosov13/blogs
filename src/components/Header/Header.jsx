import React from "react";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Header.css";

export const Header = ({ isLogIn, setIsLoggedIn, userName }) => {
  const handleLogOut = () => {
    localStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
  };

  return (
    <header className="mainHeader">
      {isLogIn ? 
        <nav>
          Добро пожаловать, &nbsp; <strong> {userName}</strong>
          <NavLink onClick={handleLogOut} to="/login" >
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
