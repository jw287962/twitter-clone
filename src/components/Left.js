import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Router";
import "./css/Left.css";
import "material-icons/iconfont/material-icons.css";
import { Link } from "react-router-dom";

const Left = (props) => {
  const user = useContext(UserContext);
  const { setLogin, login, signInUser } = user;
  const [menu, setMenu] = useState(true);
  const [viewport, setViewport] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", findViewport);
    const nav = document.querySelector(".userNav");
    const main = document.querySelector("main");
    const search = document.querySelector(".searchNav");
    if (viewport >= 950) {
      const padding = (viewport - 1000) / 2;
      nav.style.paddingLeft = `${padding}px`;
      search.style.paddingRight = `${padding}px`;
    } else {
      nav.style.paddingLeft = "0px";
      search.style.paddingRight = "0px";
    }
    if (viewport >= 501) {
      nav.style.visibility = "visible";
      main.classList.remove("darkness");
    } else {
      nav.style.visibility = "hidden";
    }
  }, [viewport]);

  const findViewport = () => {
    setViewport(window.innerWidth);
  };

  const toggleMenu = () => {
    const nav = document.querySelector(".userNav");
    const main = document.querySelector("main");
    const mainNav = document.querySelector(".mainNavList");
    const navLink = document.querySelector(".navLink");
    const navLinks = document.querySelector(".leftNavLink");

    !menu
      ? mainNav.classList.add("widthTrans")
      : mainNav.classList.remove("widthTrans");
    !menu
      ? navLink.classList.add("widthTrans")
      : navLink.classList.remove("widthTrans");
    !menu
      ? navLinks.classList.add("widthTrans")
      : navLinks.classList.remove("widthTrans");

    menu ? main.classList.add("darkness") : main.classList.remove("darkness");
    menu
      ? (nav.style.visibility = "visible")
      : (nav.style.visibility = "hidden");
    setMenu(!menu);
  };
  return (
    <nav className="userNav" aria-label="User Settings">
      TOOT
      <ul className="mainNavList">
        <img className="logo" alt="logo"></img>
        <Link
          to={{
            pathname: "/",
            // search: `?${props.login.email}`
          }}
        >
          <li className="leftNavLink">
            {" "}
            <span className="material-icons">home</span>{" "}
            <h3 className="navLink">Home</h3>
          </li>
        </Link>

        <li className="leftNavLink">
          {" "}
          <span className="material-icons">search</span>{" "}
          <h3 className="navLink">Explore</h3>
        </li>
        <li className="leftNavLink">
          {" "}
          <span className="material-icons">circle_notifications</span>{" "}
          <h3 className="navLink">Notifications</h3>
        </li>
        <li className="leftNavLink">
          {" "}
          <span className="material-icons">message</span>{" "}
          <h3 className="navLink">Messages</h3>
        </li>
        <li className="leftNavLink">
          {" "}
          <span className="material-icons">bookmark</span>
          <h3 className="navLink">Bookmarks</h3>
        </li>

        <Link to={{ pathname: "/profile" }} state={{ login: login }}>
          <li className="leftNavLink">
            {" "}
            <span className="material-icons">face</span> <h3>Profile</h3>
          </li>
        </Link>
        <li className="leftNavLink">
          {" "}
          <span className="material-icons">more</span> <h3>More</h3>
        </li>
      </ul>
      <button className="menu" onClick={toggleMenu}>
        <span className="material-icons">menu</span>
      </button>
      <button className="user" onClick={signInUser}>
        <span className="material-icons">person</span>
      </button>
    </nav>
  );
};

export default Left;
