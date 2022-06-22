import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { BlogPage } from "./Pages/BlogPage/BlogPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import "./App.css";


export function App() {

  const [isLogIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') ==='true');
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  return (
    <Router>
      <div className="App">
        <Header isLogIn={isLogIn} setIsLoggedIn={setIsLoggedIn} userName={userName} />
        <main>
          <Routes>
            <Route path="/" element={<BlogPage isLogIn={isLogIn} setIsLoggedIn={setIsLoggedIn} />} exact />
            <Route path="/login" element={<LoginPage  isLogIn={isLogIn} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>} exact />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
