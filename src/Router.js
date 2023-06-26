import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./components/UserProfileComponent/Profile";
import TweetPage from "./components/TweetPage/TweetPage";
import { SearchComponent } from "./components/Search route/SearchComponent";

import {
  signInPopUp,
  getUserAuth,
  addUserFirebase,
} from "./components/firebase";
import React, { useState, useEffect, createContext } from "react";
export const UserContext = createContext(null);

const Router = () => {
  const [login, setLogin] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLogin(JSON.parse(user));
    }
  }, []);

  async function signInUser() {
    console.log(login);
    if (login == null) {
      const signedIn = signInPopUp();
      signedIn.then(() => {
        setLogin(getUserAuth().currentUser);
        localStorage.setItem("user", JSON.stringify(getUserAuth().currentUser));
        addUserFirebase();
      });
    }
  }
  const data = { login, setLogin, signInUser };
  return (
    <BrowserRouter>
      <UserContext.Provider value={data}>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/tweet/*" element={<TweetPage />}></Route>
          <Route path="/search/*" element={<SearchComponent />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
export default Router;
