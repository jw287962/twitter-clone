import React,{useState} from "react";
import './css/Middle.css'
import Tweet from "./Tweet";
import Form from "./userForm";
import { getUserAuth } from "./firebase";

const Middle = (props) => {

  const {login} = props;
 

  return (
    <main className="content">
      <Form login={login}></Form>
    </main>
  )
}

export default Middle; 
