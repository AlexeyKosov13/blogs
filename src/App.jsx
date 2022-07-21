import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { BlogCardPage } from "./Pages/BlogPage/components/BlogCardPage/BlogCardPage";
import { BlogPage } from "./Pages/BlogPage/BlogPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { RequireAuth } from "./Hoc/RequireAuth";
import { AuthProvider } from "./Hoc/AuthProvider";
import { NoMatch } from "./Pages/NoMatch/NoMatch";
import { useGetPosts } from "./shared/queries";

import "./App.css";
import Contacts from "./Pages/Contacts/Contacts";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  
  const { data: posts} = useGetPosts();

  // useEffect(() => {
  //   setFilteredPost(posts);
  // },[])

  const [filteredPosts, setFilteredPost] = useState({});

  const [searchKey, setSearchKey] = useState();

  const handleClearSearch =() => {
    setFilteredPost(posts);
    setSearchKey('');
  }

  const handleSearchSubmit = e => {
    e.preventDefault();
    handleSearchResults();
  }

  const handleSearchResults= () => {
    const allBlogs = posts;
    console.log(searchKey);
    const filteredBlogs = allBlogs.filter((blog) => blog.description.toLowerCase().includes(searchKey.toLowerCase().trim()));
    console.log(filteredBlogs);
    setFilteredPost(filteredBlogs);
  };

  const handleSearchKey = (e) => {
    setSearchKey(e.target.value);
    handleSearchResults();
  }


  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header handleSearchKey={handleSearchKey} handleClearSearch={handleClearSearch} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} searchKey={searchKey} setSearchKey={setSearchKey} handleSearchSubmit={handleSearchSubmit} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    {<BlogPage  searchKey={searchKey} filteredPosts={filteredPosts}/>}
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
                    {<BlogPage isAdmin={isAdmin} searchKey={searchKey} filteredPosts={filteredPosts}/>}
                  </RequireAuth>
                }
                exact
              />

              <Route
                path="/contacts"
                element={
                  <RequireAuth>
                    <Contacts isAdmin={isAdmin} />
                  </RequireAuth>
                }
                exact
              />

              <Route
                path="/blog/:postId"
                element={
                  <RequireAuth>
                    <BlogCardPage isAdmin={isAdmin} />
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
