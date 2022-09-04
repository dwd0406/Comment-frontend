import Header from "../components/Header";
import React from "react";
import { Route, Routes } from 'react-router-dom'
import Auth from "../components/Login";
import Posts from "../components/Posts";
import UserPosts from "../components/UserPosts";
import PostsDetail from "../components/PostsDetail";
import AddPost from "../components/AddPost";
import { useSelector, useDispatch } from "react-redux"
import { authActions } from "../store";
import PostPage from "../components/PostPage";

function Router() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  React.useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostPage />} />
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
            </>
          ) : (
            <>
              <Route path="/posts/add" element={<AddPost />} />
              <Route path="/myPosts" element={<UserPosts />} />
              <Route path="/myPosts/:id" element={<PostsDetail />} />
              {" "}
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default Router;
