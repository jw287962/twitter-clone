import { useState, useEffect, useContext } from "react";
import { uploadImage, addMiniReplies } from "../firebase";

import { getDownloadURL } from "firebase/storage";
import { UserContext } from "../../Router";
import Tweets from "../Tweets";

import TweetHandlerWrapper from "./HOCReplyFormHandler";
const MiniReplyForm = (prop) => {
  const user = useContext(UserContext);
  // get tweetID and user of original tweet
  const {
    toggleFormHidden,
    setToggleFormHidden,
    tweet,
    setReplyMiniText,
    replyMiniText,
    arrayReplyNum,
    setNewReplyData,

    currentMiniReply,
    currentReplyData,

    media,
    toggleFileInput,

    handleFileInput,
  } = prop;
  const { login } = user;
  const { currentReply } = prop;

  useEffect(() => {
    console.log(prop);
    return () => {};
  }, []);

  const textAreaInput = (e) => {
    setReplyMiniText(e.target.value);
  };

  const removeForm = (e) => {
    if (
      e.target.className === "modalbackground" ||
      e.target.className === "removeForm"
    )
      setToggleFormHidden(true);
  };

  const processReplyFormData = async (e) => {
    e.preventDefault();
    await makeNewReplyData();
    const holder = currentMiniReply;

    if (media) {
      const uploadTask = uploadImage(media);
      uploadTask.then((downloadURL) => {
        // const array = arrayReplyNum.split(",");

        holder.reply[holder.reply.length - 1].media = downloadURL;
        addMiniReplies(
          tweet.email,
          tweet.date,
          currentReplyData.date,
          arrayReplyNum,
          holder
        );
      });
    } else {
      // tweet.date is a string right now
      await addMiniReplies(
        tweet.email,
        tweet.date,
        currentReplyData.date,
        arrayReplyNum,
        holder
      );
    }

    setNewReplyData("");
    setReplyMiniText("");
  };

  const makeNewReplyData = (e) => {
    return new Promise((resolve) => {
      console.log(currentMiniReply);
      // setCurrentReply(reply);
      // const replyDiv = e.target.parentElement.parentElement.parentElement
      const date = new Date();
      const dateString = date.toString();
      const dateData = makeDatewithMS(dateString, date);
      console.log(login);
      const holder = {
        user: login.email,
        displayName: login.displayName,
        profilePic: login.photoURL,
        date: dateData,
        text: replyMiniText,
        reply: [],
        arrayPosition:
          currentMiniReply.arrayPosition + "," + currentMiniReply.reply.length,
      };

      // console.log(holder);
      setToggleFormHidden(false);
      // query reply

      currentMiniReply.reply.push(holder);
      console.log(currentMiniReply);
      // looper(currentMiniReply);
      setNewReplyData(currentMiniReply);

      resolve("resolved");
    });
  };

  function makeDatewithMS(dateString, date) {
    return (
      dateString.substring(0, dateString.indexOf("GMT") - 1) +
      "." +
      date.getMilliseconds() +
      " " +
      dateString.substring(dateString.indexOf("GMT"))
    );
  }

  return (
    <div
      onClick={removeForm}
      className={toggleFormHidden ? "hidden" : "modalbackground"}
    >
      <form className={toggleFormHidden ? "hidden" : "minireply"}>
        <button onClick={removeForm} type="button" className="removeForm">
          X
        </button>

        {/* <Tweets key={currentReply.user+currentReply.date.substring(10,24)} text={currentReply.text} displayName ={currentReply.displayName} email ={currentReply.user}user={currentReply.user} media ={currentReply.media} date = {currentReply.date} login={login} profilePic={currentReply.profilePic}></Tweets> */}
        <div className="formTweetVisual">
          {currentMiniReply && currentMiniReply.user && (
            <Tweets
              key={
                currentMiniReply.user + currentMiniReply.date.substring(10, 24)
              }
              text={currentMiniReply.text}
              displayName={currentMiniReply.displayName}
              email={currentMiniReply.user}
              user={currentMiniReply.user}
              media={currentMiniReply.media}
              date={currentMiniReply.date}
              login={login}
              profilePic={currentMiniReply.profilePic}
            ></Tweets>
          )}
        </div>

        <div className="flexcol flexcenterxy">
          <textarea
            placeholder="TWEET YOUR REPLY!"
            name="tweet"
            form="userform"
            value={replyMiniText}
            onChange={textAreaInput}
            required="required"
            minLength="1"
          ></textarea>
        </div>
        <label htmlFor="miniMedia"></label>
        <img className="mediaInput" src={media.load} width="250"></img>
        <div className="flexcol flexcenterxy">
          <span onClick={toggleFileInput} className="material-icons">
            image
          </span>
          <input
            onChange={handleFileInput}
            type="file"
            id="miniMedia"
            name="media"
            accept="image/png, image/jpeg, video/*, gif/*"
          ></input>
          <span>{media.name}</span>
        </div>
        <input
          type="submit"
          value="Reply"
          onClick={processReplyFormData}
        ></input>
      </form>
    </div>
  );
};

export default TweetHandlerWrapper(MiniReplyForm);
