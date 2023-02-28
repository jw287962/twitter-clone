import React,{useState} from "react";
import './css/Middle.css'
import Tweet from "./Tweet";
import Form from "./userForm";
import { getUserAuth } from "./firebase";

const Middle = (props) => {

  const {login} = props;
  const testing = () => {
      console.log(getUserAuth());
      console.log(login);
  }

  return (
    <main className="content">
      <Form ></Form>
        <button onClick={testing}>Test</button>
    </main>
  )
}

export default Middle; 
