import { Markup } from "interweave";
import './css/Replies.css'
import { useEffect,useState } from "react";
import ReplyForm from "./ReplyForm";
import { useLocation } from "react-router-dom";
import {addContinuousReply,queryContinuousReply } from "./firebase";
import MiniReply from "./MiniReply";
const Reply = (props) => {
  const {login,reply,setToggleFormHidden,setCurrentReply,replyMiniText,setNewReplyData,
    setToggleReplyFormHidden,toggleReplyFormHidden,replySecondMiniText,setReplySecondMiniText,
    newReplyData,currentMiniReply,setCurrentMiniReply,setCurrentReplyData} = props;
  let data = useLocation();
// profilePic,date,media,user,displayName,text,
  const [queryReply,setQueryReply] =useState(false);
const [replyArrayHolder,setReplyArrayHolder] = useState([]);


const [replyData,setReplyData] =useState(undefined);
const handleInternalReply = () => {
    // const replyDiv = e.target.parentElement.parentElement.parentElement
    setToggleFormHidden(false);
    // query reply 
   
    setCurrentReply(reply);
}
useEffect(()=>{
  if(!replyData && !queryReply){
    queryReplies();
  
}
 function queryReplies(){
   queryContinuousReply(data.pathname.substring(7),data.search.substring(1),reply.date,setReplyData,setQueryReply)
}
},[replyData])

useEffect(() => {
  if(queryReply){
 
    console.log(replyData);
        var replyDataHolder = replyData;
        const array = [];
        if(!replyDataHolder)return;
        while(replyDataHolder.reply){
          
          array.push(replyDataHolder.reply);
          replyDataHolder = replyDataHolder.reply;
        }
        console.log(array);
        setReplyArrayHolder(array.concat([]));
        setQueryReply(false);
      }

},[queryReply])

  // NEED TO STORE OBJECTS INSIDE REPLY IE: const obj = {reply: {text: 'hi', reply: {text: "newb"}, reply1: {}}};
  if(replyArrayHolder){
    console.log(replyArrayHolder);
    return(
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
        <div>
        {replyArrayHolder.map((tweet)=>{
          console.log(tweet);
        
          return(<MiniReply replyMiniText={replySecondMiniText} key={tweet.user+tweet.date} setCurrentReply={setCurrentReply}
            reply={tweet} setToggleFormHidden={setToggleReplyFormHidden} replyData={replyData} login={login}
            newReplyData={newReplyData} setNewReplyData={setNewReplyData} currentMiniReply={currentMiniReply}setCurrentMiniReply={setCurrentMiniReply}
            setCurrentReplyData={setCurrentReplyData}></MiniReply>)
        })}
        </div>

  </div>
    )
  }
  else
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