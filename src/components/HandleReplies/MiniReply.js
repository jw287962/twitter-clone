import { Markup } from "interweave";
import "../css/Replies.css";
import { useEffect, useState } from "react";
import MiniReplyForm from "../FormReply/MiniReplyForm";
import { useLocation } from "react-router-dom";
// import { addContinuousReply, queryContinuousReply } from "../firebase";
// import ContinuousMiniReply from "./ContinuousMiniReply";
// import Tweets from "../TweetPage/TweetPage";
function makeDatewithMS(dateString, date) {
  return (
    dateString.substring(0, dateString.indexOf("GMT") - 1) +
    "." +
    date.getMilliseconds() +
    " " +
    dateString.substring(dateString.indexOf("GMT"))
  );
}

const MiniReply = (props) => {
  const {
    login,
    reply,
    removeForm,
    setCurrentReply,
    replyData,
    replyMiniText,
    setArrayReplyNum,
    setToggleFormHidden,
    setCurrentMiniReply,
    setCurrentReplyData,
    replyNum,
  } = props;
  let data = useLocation();
  // profilePic,date,media,user,displayName,text,
  // const [newReplyData,setNewReplyData] = useState(props.replyData);

  const [replyArrayHolder, setReplyArrayHolder] = useState([]);
  const handleInternalReply = (e) => {
    const replyDiv = e.target.parentElement.parentElement.parentElement;
    setToggleFormHidden(false);
    // query reply
    setArrayReplyNum(replyNum);

    //  current secondary reply data and first reply data
    setCurrentMiniReply(reply);
    setCurrentReplyData(replyData);
  };
  useEffect(() => {}, [replyMiniText]);

  useEffect(() => {
    //   if(replyData && replyData.reply && replyData.reply.length !== 0){
    //       let replyDataHolder = replyData.reply[0];
    // const array = [];
    //     // will be an arry of reply objects instead
    //     console.log(replyDataHolder);
    //         if(!replyDataHolder)return;
    //         while(replyDataHolder.reply){
    //             // if( Array.isArray(replyDataHolder.reply)){
    //             //   array.push(replyDataHolder.reply[0]);
    //             //   replyDataHolder = replyDataHolder.reply[0];
    //             // }
    //             //
    //         if(replyDataHolder.reply !== ''){
    //             array.push(replyDataHolder.reply);
    //             replyDataHolder = replyDataHolder.reply;
    //           }else{
    //             replyDataHolder = replyDataHolder.reply;
    //           }
    //         }
    //         setReplyArrayHolder(array.concat([]));
    //       }
  }, []);
  const string = replyNum + ",";

  return (
    <div className="reply" key-num={replyNum}>
      <div className="flexrow tweetuser">
        <h2>
          <img
            className="profilePic"
            src={reply.profilePic}
            height="25px"
          ></img>
          {reply.displayName}{" "}
          <span>@{reply.user.substring(0, reply.user.indexOf("@"))} </span>
        </h2>

        <p>{reply.date.substring(reply.date.indexOf(" "), 21)}</p>
      </div>

      <div className="replyTextData ">
        <Markup content={reply.text}></Markup>
        {reply.media && <img src={reply.media} className="replyImage"></img>}
      </div>
      <div className="tweetbuttons">
        <button className="tweetbutton">
          <span className="material-icons" onClick={handleInternalReply}>
            chat_bubble
          </span>
        </button>
        <button className="tweetbutton">
          <span className="material-icons">favorite</span>
        </button>
        <button className="tweetbutton">
          <span className="material-icons">share</span>
        </button>
      </div>
      {reply.reply.map((tweet, i) => {
        console.log(",tweet", tweet.date);

        if (!tweet) {
          return null;
        }
        // console.log(tweet);
        // arrayPosHolder.slice(arrayPosHolder.length,1,replyNum);
        return (
          <MiniReply
            setArrayReplyNum={setArrayReplyNum}
            replyNum={string + i}
            key={tweet.user + tweet.date}
            setCurrentReply={setCurrentReply}
            reply={tweet}
            replyData={replyData}
            login={login}
            setCurrentMiniReply={setCurrentMiniReply}
            setToggleFormHidden={setToggleFormHidden}
            setCurrentReplyData={setCurrentReplyData}
          ></MiniReply>
        );
        // replyMiniText={replySecondMiniText} setToggleFormHidden={setToggleReplyFormHidden} newReplyData={newReplyData} setNewReplyData={setNewReplyData}              currentMiniReply={currentMiniReply}
      })}
    </div>
  );
};

export default MiniReply;
