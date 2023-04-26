import React, { useState, useEffect, useContext } from "react";
import "material-icons/iconfont/material-icons.css";
import { uploadImage, addTweetFireBase } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { UserContext } from "../../Router";

import TweetHandlerWrapper from "../TweetPage/HOCReplyFormHandler";
const Form = (props) => {
  const user = useContext(UserContext);

  const {
    signInUser,
    media,
    toggleFileInput,
    userTweetText,
    setUserTweetText,
    setMedia,
    textAreaInput,
    handleFileInput,
  } = props;
  const { login } = user;

  const processTweetData = (e) => {
    e.preventDefault();

    console.log(media);
    if (media) {
      // const img = document.querySelector('#media');
      // console.log(img.files[0])
      // const imgURL  = URL.createObjectURL(img.files[0]);
      // console.log(imgURL);
      const uploadTask = uploadImage(media);
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        addTweetFireBase(userTweetText, downloadURL);
      });
    } else {
      addTweetFireBase(userTweetText, "");
    }

    setUserTweetText("");
    setMedia("");
  };

  useEffect(() => {});
  if (!login) {
    return (
      <form id="userform">
        <h3>Please Login</h3>
        <button className="user" onClick={signInUser}>
          <span className="material-icons">person</span>
        </button>
        <textarea name="tweet" form="userform"></textarea>
      </form>
    );
  }

  return (
    <form className="tweetform" id="userform">
      <h3>
        Hi, {login.displayName.substring(0, login.displayName.indexOf(" "))}
      </h3>
      <textarea
        placeholder="TWEET HERE!"
        name="tweet"
        form="userform"
        value={userTweetText}
        onChange={textAreaInput}
        required="required"
        minLength="1"
      ></textarea>
      <label htmlFor="media"></label>
      <img className="mediaInput" src={media.load} width="250"></img>

      <div className="flexcol">
        <div onClick={toggleFileInput} className="material-icons">
          image
          <input
            onChange={handleFileInput}
            type="file"
            id="media"
            name="media"
            accept="image/png, image/jpeg, video/*, gif/*"
          ></input>
        </div>
      </div>

      <input type="submit" value="Tweet" onClick={processTweetData}></input>
    </form>
  );
};

export default TweetHandlerWrapper(Form);
