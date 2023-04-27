import { useState, useEffect, useContext } from "react";
import {
  uploadImage,
  getDownloadURL,
  addContinuousReply,
  addSecondaryReply,
} from "../firebase";
import { useLocation } from "react-router-dom";
import Tweets from "../Tweets";

import { UserContext } from "../../Router";
const ReplyForm = (prop) => {
  const user = useContext(UserContext);
  // get tweetID and user of original tweet
  const {
    toggleFormHidden,
    setToggleFormHidden,
    tweet,
    setReplyMiniText,
    replyMiniText,
    arrayReplyNum,
  } = prop;
  const { login } = user;
  const { currentReply } = prop;
  // ,user,text,date,displayName,media,profilePic
  // const {tweet} =prop;
  // const [userTweetText,setUserTweetText] = useState('');
  const [mediaReply, setMediaReply] = useState("");

  const [replyArrayData, setReplyArrayData] = useState([]);
  const toggleFileInput = (e) => {
    e.preventDefault();
    const fileInput = document.querySelector("#media");
    fileInput.click();
  };

  useEffect(() => {
    console.log(login);

    console.log(prop);
    return () => {};
  });

  const textAreaInput = (e) => {
    setReplyMiniText(e.target.value);
  };

  const handleFileInput = (e) => {
    // e.preventDefault();
    // console.log(this.readFile(e.target.value))
    const reader = new FileReader();
    console.log(e.target.files);
    reader.addEventListener("load", () => {
      const holder = reader.result;
      const imgURL = URL.createObjectURL(e.target.files[0]);
      setMediaReply({
        file: e.target.files[0],
        name: e.target.files[0].name,
        load: imgURL,
      });
      // setMedia(reader.result);
    });
    console.log(e.target.files);
    reader.readAsDataURL(e.target.files[0]);
  };

  const removeForm = (e) => {
    e.stopPropagation();
    if (e.target.tagName === "DIV") setToggleFormHidden(true);
  };

  const processFormData = async (e) => {
    e.preventDefault();
    const date = new Date();
    const dateString = date.toString();
    const dateData = makeDatewithMS(dateString, date);
    // console.log(newReplyData);
    // query the array and push a new arrayZ?

    console.log(replyArrayData);
    // will need to fix when query replies and to make sure i am updating the correct part within.
    const holder = {
      user: login.email,
      displayName: login.displayName,
      profilePic: login.photoURL,
      date: dateData,
      text: replyMiniText,
      reply: [],
    }; //arrayPosition:

    console.log(currentReply);

    const data = await addSecondaryReply(
      holder,
      tweet.email,
      tweet.date,
      currentReply.date,
      setReplyArrayData
    );
    // replyArrayData.push(holder);
    // tweet.date is a string right now
    // addContinuousReply(replyArrayData,tweet.email,tweet.date,currentReply.date);
    // setNewReplyData('');
    // async function addContinuousReply(reply,tweetUser,textID,replyID){
    // const data = await setDoc(doc(db, 'users', `${tweetUser}`,'tweets',textID, 'replies', replyID), {
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

  console.log(currentReply);
  return (
    <div
      onClick={removeForm}
      className={toggleFormHidden ? "hidden" : "modalbackground"}
    >
      {/* <button
          className={toggleFormHidden ? "hidden" : "fullscreen"}
          onClick={removeForm}
          type="button"
        ></button> */}
      <form className={toggleFormHidden ? "hidden" : "minireply"}>
        <button onClick={removeForm} type="button">
          X
        </button>

        {currentReply.user && (
          <Tweets
            key={currentReply.user + currentReply.date.substring(10, 24)}
            text={currentReply.text}
            displayName={currentReply.displayName}
            email={currentReply.user}
            user={currentReply.user}
            media={currentReply.media}
            date={currentReply.date}
            login={login}
            profilePic={currentReply.profilePic}
          ></Tweets>
        )}
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
        <label htmlFor="media"></label>
        <img className="mediaInput" src={mediaReply.load} width="250"></img>
        <div className="flexcol flexcenterxy">
          <button onClick={toggleFileInput} className="material-icons">
            image
            <input
              onChange={handleFileInput}
              type="file"
              id="media"
              name="media"
              accept="image/png, image/jpeg, video/*, gif/*"
            ></input>
          </button>
        </div>
        <input type="submit" value="Reply" onClick={processFormData}></input>
      </form>
    </div>
  );
};

export default ReplyForm;
