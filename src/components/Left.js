import React,{useState,useEffect} from "react";
import './css/Left.css'
import 'material-icons/iconfont/material-icons.css';
import { signInPopUp,getUserAuth,addUserFirebase} from "./firebase";
const Left = (props) => {
  const {setLogin,login} = props;
  const [menu, setMenu] = useState(true);
const [viewport,setViewport] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", findViewport);
    if(viewport >= 501){
      const nav = document.querySelector('.userNav');
      nav.style.visibility = 'visible'; 
    }
  })
  const findViewport = () => {
    setViewport(window.innerWidth);
  }

  async function signInUser(){
    if(login == null){
      const signedIn = signInPopUp()
      signedIn.then(()=>  {
          setLogin(getUserAuth().currentUser) 
          localStorage.setItem('user',JSON.stringify(getUserAuth().currentUser));
          addUserFirebase();
    
        });
    }
 }

 const toggleMenu = () => {
  const nav = document.querySelector('.userNav');
  const main = document.querySelector('main');

  main.classList.toggle('darkness');
  menu ? 
  nav.style.visibility = 'visible' : 
  nav.style.visibility = 'hidden' ;
  setMenu(!menu);
 }
  return (
    <nav className="userNav" aria-label="User Settings">
      TOOT
       <ul >
        <img className="logo" alt="logo"></img>
          <li>    <span className="material-icons">home</span> <h3>Home</h3></li>
          <li> <span className="material-icons">search</span> <h3>Explore</h3></li>
          <li> <span className="material-icons">circle_notifications</span> <h3>Notifications</h3></li>
          <li> <span className="material-icons">message</span> <h3>Messages</h3></li>
          <li> <span className="material-icons">bookmark</span><h3>Bookmarks</h3></li>
          <li> <span className="material-icons">face</span> <h3>Profile</h3></li>
          <li> <span className="material-icons">more</span> <h3>More</h3></li>
        </ul>
        <button className="menu" onClick={toggleMenu}><span className="material-icons">menu</span></button>
        <button className="user" onClick={signInUser}><span className="material-icons">person</span></button>
    </nav>
  )
}

export default Left; 