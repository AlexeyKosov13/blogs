import React from "react";
import { NavLink, Link } from "react-router-dom";
import { UseAuth } from "../../Hook/UseAuth";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

export const Header = ({
  isLogIn,
  setIsLoggedIn,
  setIsAdmin,
  setSearchKey,
  searchKey,
  handleClearSearch,
  handleSearchSubmit,

}) => {
  const { user } = UseAuth();
  const { signout } = UseAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signout(() => navigate("/login"), { repalce: true });
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", false);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

 

  return (
    <header className="mainHeader">
      <div className="topLeft">
        <SearchBar
          value={searchKey}
          clearSearch={handleClearSearch}
          formSubmit={handleSearchSubmit}
          handleSearchKey={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/blog" className="link">
              блог
            </Link>
          </li>
          <li className="topListItem">
            <a
              href="https://myportfolio2-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Обо мне
            </a>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <nav>
            <strong> {user}</strong>
            <NavLink onClick={() => handleLogOut()} to="/login">
              Выход
              <ExitToAppIcon />
            </NavLink>
          </nav>
        ) : (
          "Вы не авторизированы"
        )}
      </div>
    </header>
  );
};
