import React,{useState,useEffect} from "react";
import './css/Right.css'
import { signInPopUp,getUserAuth } from "./firebase";

import 'material-icons/iconfont/material-icons.css';

const Right = (props) => {

  const {setLogin,login} = props;

 async function signInUser(){
  const signedIn = signInPopUp()
  console.log(signedIn);
  signedIn.then(()=>  {
      setLogin(getUserAuth().currentUser) 
      localStorage.setItem('user',JSON.stringify(getUserAuth().currentUser));
    });

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
            <label className="flexcol"><span className="material-icons" id="searchbar">search</span>  <input type='text'></input></label>
           
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