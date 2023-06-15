import React, { useState, useEffect } from "react";
import Left from "../Left";
import Right from "../Right";
import UserProfile from "./UserProfile";
import { useLocation } from "react-router";
const Profile = (props) => {
  let data = useLocation();
  console.log(data);
  const { login, search } = data;

  useEffect(() => {
    console.log(data.search.substring(1));
    // let data = useLocation();

    console.log(data);
  });

  return (
    <div className="flexrow">
      <Left login={login}></Left>
      <UserProfile
        login={login}
        search={data.search.substring(1)}
      ></UserProfile>
      <Right login={login}></Right>
    </div>
  );
};

export default Profile;
