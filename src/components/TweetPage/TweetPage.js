import React, { useState, useEffect } from "react";
import { Markup } from "interweave";
import Left from "../Left";
import Right from "../Right";
import MainTweet from "./MainTweet";
import { Link } from "react-router-dom";
import UserProfile from "../UserProfileComponent/UserProfile";
import { useLocation } from "react-router";
const TweetPage = (props) => {
  let data = useLocation();
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLogin(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    console.log(login);
  });

  return (
    <div className="flexrow">
      <Left login={login}></Left>
      <MainTweet login={login}></MainTweet>
      <Right login={login}></Right>
    </div>
  );
};

export default TweetPage;
