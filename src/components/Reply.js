import { Markup } from "interweave";
import './css/Replies.css'
import { useEffect } from "react";

const Reply = (props) => {
  const {profilePic,date,media,user,displayName,text} = props;

  useEffect(()=>{
    console.log(profilePic)
  })

  // NEED TO STORE OBJECTS INSIDE REPLY IE: const obj = {reply: {text: 'hi', reply: {text: "newb"}, reply1: {}}};
  return (
    <div className="reply">
    
      <div className="flexrow tweetuser">
     
           <h2><img className="profilePic"src={profilePic} height='25px'></img>{displayName} <span>@{user.substring(0,user.indexOf('@'))} </span></h2>
     
      <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>

          <Markup content = {text}></Markup>
          <div className="tweetbuttons">
      
      <button className="tweetbutton"><span className="material-icons">chat_bubble</span></button>
      <button className="tweetbutton"><span className="material-icons">favorite</span></button>
       <button className="tweetbutton"><span className="material-icons">share</span></button>
       </div>


</div>
  )
}

export default Reply;