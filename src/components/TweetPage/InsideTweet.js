import TweetHandlerWrapper from "./HOCReplyFormHandler";

import React, { useState, useEffect } from "react";
import Tweets from "../Tweets";
import { Link } from "react-router-dom";
import {
  uploadImage,
  addReplyFirebase,
  queryTweetSingle,
  queryReplyFirebase,
} from "../firebase";
import { useLocation } from "react-router-dom";
import ReplyForm from "./ReplyForm";
import MiniReplyForm from "./MiniReplyForm";
import Reply from "../ReplyComponent/Reply";
import { getDownloadURL } from "firebase/storage";

const MainTweet = (prop) => {
  // FOR UI TOGGLE A REPLY TO A REPLY
  const [toggleFormHidden, setToggleFormHidden] = useState(true);
  const [toggleReplyFormHidden, setToggleReplyFormHidden] = useState(true);

  // FOR QUERY the TWEET and get Replies FOR dISPLAY
  let data = useLocation();
  const [tweetUser] = useState(data.pathname.substring(7));
  const [tweetID] = useState(data.search.substring(1));
  const [tweet, setTweet] = useState(undefined);
  const [newReplyData, setNewReplyData] = useState("");
  const [replies, setReplies] = useState([]);

  const {
    login,
    media,
    toggleFileInput,
    userTweetText,
    setUserTweetText,
    setMedia,
    textAreaInput,
    handleFileInput,
  } = prop;

  // FOR THE REPLY TO A REPLY HANDLING
  const [replyMiniText, setReplyMiniText] = useState("");
  const [replySecondMiniText, setReplySecondMiniText] = useState("");
  // TO KEEP TRACK OF WHICH REPLY YOU ARE REPLYING TO.
  const [currentReply, setCurrentReply] = useState([]);
  const [currentMiniReply, setCurrentMiniReply] = useState([]);
  const [arrayReplyNum, setArrayReplyNum] = useState(0);

  const [currentReplyData, setCurrentReplyData] = useState("");

  const [loadingData, setLoadingData] = useState(false);
  const [loadLimiter, setLoadLimiter] = useState(5);
  // REMOVE REPLY FORM IF VISIBLE
  // const removeForm = (e) => {
  //   console.log(toggleFormHidden, "remove form condition");
  //   if (!toggleFormHidden) {
  //     console.log("remove form");
  //     setToggleFormHidden(true);
  //   }
  // };

  // QUERY TWEET
  useEffect(() => {
    if (!prop.tweet && !tweet) {
      queryTweetSingle(tweetUser, tweetID, setTweet);
    }
  }, [tweet]);

  useEffect(() => {
    async function queryReplies() {
      await queryReplyFirebase(tweetUser, tweetID, setReplies, setLoadingData);
      setLoadingData(false);
    }

    queryReplies();
  }, [loadLimiter]);

  useEffect(() => {
    document.addEventListener("scroll", isBottom);
    return () => document.removeEventListener("keyup", isBottom);
  }, []);

  const addFiveLimit = () => {
    setLoadLimiter(loadLimiter + 5);
  };
  function isBottom(e) {
    if (replies.length <= loadLimiter) {
      return;
    }
    if (window.innerHeight * 2 >= document.body.scrollHeight) {
      if (
        Math.abs(
          document.body.scrollHeight - window.innerHeight - window.scrollY
        ) <= 8
      ) {
        addFiveLimit();
      }
    } else if (window.scrollY >= window.innerHeight) {
      addFiveLimit();
    }
  }
  const processReplyData = (e) => {
    console.log("first reply off main tweet");
    e.preventDefault();
    if (media) {
      // const img = document.querySelector('#media');
      // console.log(img.files[0])
      // const imgURL  = URL.createObjectURL(img.files[0]);
      // console.log(imgURL);
      const uploadTask = uploadImage(media);
      // NEED TO CHANGE TO ADDREPLY
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        addReplyFirebase(userTweetText, tweetID, tweetUser, downloadURL);
      });
    } else {
      const finish = addReplyFirebase(userTweetText, tweetID, tweetUser);

      finish.then((complete) => {
        queryReplyFirebase(tweetUser, tweetID, setReplies, setLoadingData);
      });
    }

    setUserTweetText("");
    setMedia("");
  };

  if (!tweet) {
    return (
      <main className="content">
        {<div id={!loadingData ? "hidden" : "loader"}> </div>}
      </main>
    );
  }

  return (
    <main className="content">
      <Tweets
        key={tweet.user + tweet.date.substring(10, 24)}
        text={tweet.text}
        displayName={tweet.displayName}
        email={tweet.email}
        user={tweet.user}
        media={tweet.media}
        date={tweet.date}
        login={login}
        profilePic={tweet.profilePic}
        likes={tweet.likes}
      ></Tweets>

      <form className="tweetform" id="replyform">
        <textarea
          placeholder="TWEET YOUR REPLY!"
          name="tweet"
          form="replyform"
          value={userTweetText}
          onChange={textAreaInput}
          required="required"
          minLength="1"
        ></textarea>
        <label htmlFor="media"></label>
        <img className="mediaInput" src={media.load} width="250"></img>

        <div className="flexcol">
          <span onClick={toggleFileInput} className="material-icons">
            image
          </span>
          <input
            onChange={handleFileInput}
            type="file"
            id="media"
            name="media"
            accept="image/png, image/jpeg, video/*, gif/*"
          ></input>
        </div>

        <input type="submit" value="Reply" onClick={processReplyData}></input>
      </form>
      <div className="replyContainer">
        {replies.map((reply) => {
          return (
            <Reply
              setArrayReplyNum={setArrayReplyNum}
              login={login}
              key={reply.name + reply.date}
              reply={reply}
              toggleFormHidden={toggleFormHidden}
              replySecondMiniText={replySecondMiniText}
              setToggleFormHidden={setToggleFormHidden}
              currentMiniReply={currentMiniReply}
              setCurrentMiniReply={setCurrentMiniReply}
              setToggleReplyFormHidden={setToggleReplyFormHidden}
              setCurrentReply={setCurrentReply}
              newReplyData={newReplyData}
              setNewReplyData={setNewReplyData}
              setCurrentReplyData={setCurrentReplyData}
            ></Reply>
          );
        })}
      </div>
      <ReplyForm
        arrayReplyNum={arrayReplyNum}
        login={login}
        currentReply={currentReply}
        tweet={tweet}
        toggleFormHidden={toggleFormHidden}
        setToggleFormHidden={setToggleFormHidden}
        replyMiniText={replyMiniText}
        setReplyMiniText={setReplyMiniText}
      ></ReplyForm>

      <MiniReplyForm
        arrayReplyNum={arrayReplyNum}
        login={login}
        currentReply={currentReply}
        tweet={tweet}
        toggleFormHidden={toggleReplyFormHidden}
        setToggleFormHidden={setToggleReplyFormHidden}
        replyMiniText={replySecondMiniText}
        setReplyMiniText={setReplySecondMiniText}
        currentMiniReply={currentMiniReply}
        setNewReplyData={setNewReplyData}
        currentReplyData={currentReplyData}
      ></MiniReplyForm>
      {/*   setCurrentReplyData={setCurrentReplyData} is for the .reply objects */}
      {/* after setting new reply data . i need to update reply with new reply */}
    </main>
  );
};

export default TweetHandlerWrapper(MainTweet);
