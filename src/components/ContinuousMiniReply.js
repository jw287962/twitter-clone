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

const ContinuousMiniReply = (props) => {
  const {login,reply,removeForm,setCurrentReply,replyData,replyMiniText,setArrayReplyNum
    ,setToggleFormHidden,setCurrentMiniReply,setCurrentReplyData,replyNum} = props;
  let data = useLocation();
// profilePic,date,media,user,displayName,text,
  // const [newReplyData,setNewReplyData] = useState(props.replyData);

const [replyArrayHolder,setReplyArrayHolder] = useState([]);
const handleInternalReply = (e) => {
  console.log(replyNum);
  const replyDiv = e.target.parentElement.parentElement.parentElement
  setArrayReplyNum(replyNum);  //will be like 1,2,3,5
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

useEffect(() => {
//   if(replyData && replyData.reply && replyData.reply.length !== 0){
 
//       let replyDataHolder = reply;
// const array = [];
//     // will be an arry of reply objects instead

//       }

},[])
const string = replyNum+',';
console.log(reply);
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
       {reply.reply.map((tweet,i)=>{
        if(!tweet){
          return null;
        }
          console.log(tweet)
          // arrayPosHolder.slice(arrayPosHolder.length,1,replyNum);
          return(<ContinuousMiniReply setArrayReplyNum={setArrayReplyNum} replyNum={string+i}  key={tweet.user+tweet.date} setCurrentReply={setCurrentReply}
            reply={tweet}  replyData={replyData} login={login}
setCurrentMiniReply={setCurrentMiniReply} setToggleFormHidden={setToggleFormHidden}
            setCurrentReplyData={setCurrentReplyData}></ContinuousMiniReply>)
            // replyMiniText={replySecondMiniText} setToggleFormHidden={setToggleReplyFormHidden} newReplyData={newReplyData} setNewReplyData={setNewReplyData}              currentMiniReply={currentMiniReply}
        })}

    </div>
  )
}

export default ContinuousMiniReply;