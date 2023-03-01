import React,{useState,useEffect} from "react";
import './css/Right.css'
import { signInPopUp,getUserAuth } from "./firebase";

const Right = (props) => {

  const {setLogin,login} = props;

const signInUser = () => {
  signInPopUp();
  setLogin(getUserAuth().currentUser);

  localStorage.setItem('user',JSON.stringify(getUserAuth().currentUser));

}

const signOutUser = () => {
  
setLogin(null);

  localStorage.setItem('user','');

}

useEffect(() => {

})

  if(login){
    return (
      <nav className="searchNav">
        <button  onClick={signOutUser}>Logout</button>
          <form>
            <input type='text'></input>
          </form>
      </nav>
    )
  }

  return (
    <nav className="searchNav">
      <button onClick={signInUser} >Login</button>
        <form>
          <input type='text'></input>
        </form>
    </nav>
  )
}

export default Right; 