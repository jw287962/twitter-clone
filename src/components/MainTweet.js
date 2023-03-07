
import React,{useState,useEffect} from "react";
import Tweets from "./Tweets";
import { Link } from "react-router-dom";

const MainTweet = (prop) => {

  const {tweet,login} = prop

useEffect(()=>{
console.log(prop);
});

return (
      <main className="content">
            <Tweets key={tweet.user+tweet.date.substring(10,24)} text={tweet.text} displayName ={tweet.displayName} email ={tweet.email}user={tweet.user} media ={tweet.media} date = {tweet.date} login={login}></Tweets>
       </main>
  )
}

export default MainTweet; 