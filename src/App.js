import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import Left from "./components/Left";
import Middle from "./components/Middle";
import Right from "./components/Right";
import {
  signInPopUp,
  getUserAuth,
  addUserFirebase,
} from "./components/firebase";
// const process_env = process.env;

function App() {
  return (
    <div className="App">
      <Left></Left>
      <Middle></Middle>
      <Right></Right>
    </div>
  );
}

export default App;
