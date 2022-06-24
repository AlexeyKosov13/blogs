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
import { RequireAuth } from "./Hoc/RequireAuth";
import { AuthProvider } from "./Hoc/AuthProvider";
import { NoMatch } from "./Pages/NoMatch/NoMatch";

import "./App.css";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <BlogPage />
                  </RequireAuth>
                }
                exact
              />
              <Route
                path="/login"
                element={
                  <LoginPage
                    isLogIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setIsAdmin={setIsAdmin}
                  />
                }
                exact
              />

              <Route
                path="/blog"
                element={
                  <RequireAuth>
                    <BlogPage isAdmin={isAdmin} />
                  </RequireAuth>
                }
                exact
              />

              <Route path="*" element={<NoMatch />} />

              {/* <Route 
                path="*"
                element ={<RequireAuth>
                  <NoMatch/>
                </RequireAuth>}
              /> */}
            </Routes>
          </main>

          <Footer year={new Date().getFullYear()} />
        </div>
      </Router>
    </AuthProvider>
  );
}
