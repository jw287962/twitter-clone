import { Markup } from "interweave";
import './css/Replies.css'
import { useEffect,useState } from "react";
import ReplyForm from "./ReplyForm";
import { useLocation } from "react-router-dom";
import {addContinuousReply,queryContinuousReply } from "./firebase";

const Reply = (props) => {
  const {reply,setToggleFormHidden,removeForm,setCurrentReply} = props;
  let data = useLocation();
// profilePic,date,media,user,displayName,text,
  const [replyData,setReplyData] =useState('');
const handleInternalReply = (e) => {
  const replyDiv = e.target.parentElement.parentElement.parentElement
  console.log(data);
  setToggleFormHidden(false);
// query reply 
setCurrentReply(reply);

  // addContinuousReply(newText,data.pathname.substring(7),data.search.substring(1),date)
  // async function addContinuousReply(reply,tweetUser,textID,replyID){
    // const data = await setDoc(doc(db, 'users', `${tweetUser}`,'tweets',textID, 'replies', replyID), {
}
useEffect(()=>{
  console.log(reply);

},)

  // NEED TO STORE OBJECTS INSIDE REPLY IE: const obj = {reply: {text: 'hi', reply: {text: "newb"}, reply1: {}}};
  return (
    <div className="reply" >
    
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

export default Reply;