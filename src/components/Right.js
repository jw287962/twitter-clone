import React, { useState, useEffect, useContext } from "react";
import "./css/Right.css";
import { UserContext } from "../Router";
import "material-icons/iconfont/material-icons.css";

import { Link } from "react-router-dom";

import { querySearchTerm } from "./firebase";

const Right = (props) => {
  const user = useContext(UserContext);
  // const { setLogin, login, signInUser } = user;
  const [searchData, setSearchData] = useState("");
  // console.log(user());

  const signOutUser = () => {
    user.setLogin(null);
    localStorage.setItem("user", "");
  };

  useEffect(() => {});

  function updateSearchData(e) {
    setSearchData(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    const search = document.querySelector(".search");
    console.log(search.click());
    // const result = querySearchTerm(searchData);
  }

  if (user.login) {
    return (
      <nav className="searchNav">
        <div>
          <button onClick={signOutUser}>Logout</button>
          <form className="searchForm" onSubmit={handleSearch}>
            <label className="flexrow">
              <span className="material-icons" id="searchbar">
                search
              </span>
              <input
                type="text"
                onChange={updateSearchData}
                value={searchData}
              ></input>
            </label>
          </form>
        </div>
        <Link
          className="search"
          to={{
            pathname: `/search/`,
            search: `${searchData}`,
          }}
        ></Link>
      </nav>
    );
  }

  return (
    <nav className="searchNav">
      <div>
        <button onClick={user.signInUser}>Login</button>
        <form>
          <input type="text"></input>
        </form>
      </div>
    </nav>
  );
};

export default Right;
