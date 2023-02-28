import React,{useState} from "react";
import './css/Middle.css'
import Tweet from "./Tweet";
import Form from "./userForm";
import { getUserAuth } from "./firebase";

const Middle = () => {

  const testing = () => {
      console.log(getUserAuth());
  }

  return (
    <main className="content">
      <Form></Form>
        <button onClick={testing}>Test</button>
    </main>
  )
}

export default Middle; 
