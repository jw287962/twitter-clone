import { Markup } from "interweave";
import './css/Replies.css'
import { useEffect,useState } from "react";
import MiniReplyForm from './MiniReplyForm'
import { useLocation } from "react-router-dom";
import {addContinuousReply,queryContinuousReply } from "./firebase";
import Tweets from './Tweet.js'
function makeDatewithMS(dateString,date){
  return dateString.substring(0,dateString.indexOf('GMT')-1) + '.' + date.getMilliseconds()+ ' ' + dateString.substring(dateString.indexOf('GMT'))
 }

const MiniReply = (props) => {
  const {login,reply,removeForm,setCurrentReply,replyData,replyMiniText,setArrayReplyNum
    ,setToggleFormHidden,setCurrentMiniReply,setCurrentReplyData,replyNum} = props;
  let data = useLocation();
// profilePic,date,media,user,displayName,text,
  // const [newReplyData,setNewReplyData] = useState(props.replyData);


const handleInternalReply = (e) => {
  const replyDiv = e.target.parentElement.parentElement.parentElement
  setArrayReplyNum(replyNum);
  console.log(replyDiv)
  setToggleFormHidden(false);
  // query reply 
 console.log(replyData)

//  current secondary reply data and first reply data
  setCurrentMiniReply(reply);
  setCurrentReplyData(replyData);
}
useEffect(() => {

 
},[replyMiniText])
  return (
    <div className="reply" key-num={replyNum} >
    
      <div className="flexrow tweetuser">
     
           <h2><img className="profilePic"src={reply.profilePic} height='25px'></img>{reply.displayName} <span>@{reply.user.substring(0,reply.user.indexOf('@'))} </span></h2>
     
      <p>{reply.date.substring(reply.date.indexOf(' '),21)}</p>
            </div>

          <Markup content = {reply.text}></Markup>
          <div className="tweetbuttons">
      
      <button className="tweetbutton"><span className="material-icons" onClick={handleInternalReply}>chat_bubble</span></button>
      <button className="tweetbutton"><span className="material-icons">favorite</span></button>
       <button className="tweetbutton"><span className="material-icons">share</span></button>
        
       </div>
      

    </div>
  )
}

export default MiniReply;