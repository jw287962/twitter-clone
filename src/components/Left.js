import React,{useState} from "react";
import './css/Left.css'
const Left = () => {

  return (
    <nav className="userNav" aria-label="User Settings">
        <img className="logo" alt="logo"></img>
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>Notifications</li>
          <li>Messages</li>
          <li>Bookmarks</li>
          <li>Profile</li>
          <li>More</li>
        </ul>
    </nav>
  )
}

export default Left; 