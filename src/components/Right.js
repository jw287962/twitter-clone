import React,{useState,useEffect} from "react";
import './css/Right.css'
import { signInPopUp,getUserAuth,addUserFirebase} from "./firebase";

import 'material-icons/iconfont/material-icons.css';

const Right = (props) => {

  const {setLogin,login} = props;

 async function signInUser(){
  const signedIn = signInPopUp()
  console.log(signedIn);
  signedIn.then(()=>  {
      setLogin(getUserAuth().currentUser) 
      localStorage.setItem('user',JSON.stringify(getUserAuth().currentUser));
      addUserFirebase();

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
        <div>
          <button  onClick={signOutUser}>Logout</button>
            <form>
              <label className="flexrow"><span className="material-icons" id="searchbar">search</span>  <input type='text'></input></label>
          
            </form>
        </div>
      </nav>
    )
  }

  return (
    <nav className="searchNav">
      <div>
        <button onClick={signInUser} >Login</button>
          <form>
            <input type='text'></input>
          </form>
      </div>
    </nav>
  )
}

export default Right; 