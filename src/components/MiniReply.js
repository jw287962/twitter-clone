import { Markup } from "interweave";
import './css/Replies.css'
import { useEffect,useState } from "react";
import ReplyForm from "./ReplyForm";
import { useLocation } from "react-router-dom";
import {addContinuousReply,queryContinuousReply } from "./firebase";
import Tweets from './Tweet.js'

const MiniReply = (props) => {
  const {login,reply,setToggleFormHidden,removeForm,setCurrentReply} = props;
  let data = useLocation();
// profilePic,date,media,user,displayName,text,



  return (
    <div className="reply" >
    
      <div className="flexrow tweetuser">
     
           <h2><img className="profilePic"src={reply.profilePic} height='25px'></img>{reply.displayName} <span>@{reply.user.substring(0,reply.user.indexOf('@'))} </span></h2>
     
      <p>{reply.date.substring(reply.date.indexOf(' '),21)}</p>
            </div>

          <Markup content = {reply.text}></Markup>
          <div className="tweetbuttons">
      
      <button className="tweetbutton"><span className="material-icons" >chat_bubble</span></button>
      <button className="tweetbutton"><span className="material-icons">favorite</span></button>
       <button className="tweetbutton"><span className="material-icons">share</span></button>
        
       </div>


    </div>
  )
}

export default MiniReply;