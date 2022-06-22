import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { BlogPage } from "./Pages/BlogPage/BlogPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import "./App.css";


export function App() {

  const [isLogIn, setIsLoggIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<BlogPage />} exact />
            <Route path="/login" element={<LoginPage/>} exact />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
