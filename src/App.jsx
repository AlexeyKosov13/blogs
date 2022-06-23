import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import { BlogPage } from "./Pages/BlogPage/BlogPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import "./App.css";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userName={userName}
        />
        <main>
          <Routes>
            <Route
              path="/"
              
            element={
              isLoggedIn?<Navigate to='/blog' /> :<Navigate to='/login' />
              }
              
              exact
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  isLogIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserName={setUserName}
                />
              }
              exact
            />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
