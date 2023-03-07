
import React,{useState,useEffect} from "react";
import { Markup } from 'interweave';
import Left from'./Left';
import Right from'./Right';
import MainTweet from './MainTweet'
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useLocation } from "react-router";
const Tweet = (props) => {
      let data = useLocation();
      const {login} = data.state;

 

useEffect(()=>{
      console.log(data.state);

console.log(login);
})

return (
      <div className="flexrow">
                  <Left login={login}></Left> 
            <MainTweet login={login} tweet = {data.state.tweet}></MainTweet>
            <Right login={login} ></Right>
       </div>
  )
}

export default (Tweet); 