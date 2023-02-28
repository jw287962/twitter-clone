import React,{useState} from "react";
import './css/Right.css'
import { signInPopUp } from "./firebase";
const Right = () => {

  return (
    <nav className="searchNav">
      <button onClick={signInPopUp}>Login</button>
        <form>
          <input type='text'></input>
        </form>
    </nav>
  )
}

export default Right; 