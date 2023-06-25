import { Markup } from "interweave";
import "../css/Replies.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MiniReply from "./MiniReply";
const Reply = (props) => {
  const {
    login,
    reply,
    setToggleFormHidden,
    setCurrentReply,
    setNewReplyData,
    setToggleReplyFormHidden,
    replySecondMiniText,
    integer,
    newReplyData,
    currentMiniReply,
    setCurrentMiniReply,
    setCurrentReplyData,
    setArrayReplyNum,
  } = props;
  let data = useLocation();
  // profilePic,date,media,user,displayName,text,

  const [replyData, setReplyData] = useState(reply);
  //
  const handleInternalReply = () => {
    console.log("reply");
    // const replyDiv = e.target.parentElement.parentElement.parentElement
    setToggleFormHidden(false);
    // query reply

    setCurrentReply(reply);
    setCurrentMiniReply("");
  };
  // useEffect(() => {
  // if (!replyData && !queryReply) {
  //   queryReplies();
  // }
  // function queryReplies() {}
  // }, [replyData]);

  // useEffect(() => {
  //   if (
  //     queryReply &&
  //     replyData &&
  //     replyData.reply &&
  //     replyData.reply.length !== 0
  //   ) {
  //     setReplyArrayHolder(replyData.reply.concat([]));
  //     setQueryReply(false);
  //   }
  // }, [queryReply]);
  // console.log(reply);
  // NEED TO STORE OBJECTS INSIDE REPLY IE: const obj = {reply: {text: 'hi', reply: {text: "newb"}, reply1: {}}};
  // console.log(replyArrayHolder);
  const string = integer + ",";
  return (
    <div className="reply" key-num={integer}>
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

      <div className="replyTextData">
        <Markup content={reply.text}></Markup>
        {reply.media && (
          <img src={reply.media} className="replyImage" height={100}></img>
        )}
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
      <div className="replyContainer">
        {reply &&
          reply.reply.map((tweet, i) => {
            return (
              <MiniReply
                login={login}
                setArrayReplyNum={setArrayReplyNum}
                replyNum={string + i}
                replyMiniText={replySecondMiniText}
                key={tweet.user + tweet.date}
                setCurrentReply={setCurrentReply}
                reply={tweet}
                replyData={replyData}
                setToggleFormHidden={setToggleFormHidden}
                newReplyData={newReplyData}
                setNewReplyData={setNewReplyData}
                currentMiniReply={currentMiniReply}
                setCurrentMiniReply={setCurrentMiniReply}
                setCurrentReplyData={setCurrentReplyData}
              ></MiniReply>
            );
          })}
      </div>
    </div>
  );
};

export default Reply;
