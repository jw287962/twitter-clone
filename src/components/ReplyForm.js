import { useState,useEffect } from "react";
import {uploadImage,getDownloadURL ,addContinuousReply} from "./firebase";
import { useLocation } from "react-router-dom";
import Tweets from "./Tweets";
const ReplyForm = (prop) =>{
// get tweetID and user of original tweet
  const {login,toggleFormHidden,setToggleFormHidden,tweet,setReplyMiniText,replyMiniText} = prop;

  const {currentReply} = prop;
  // ,user,text,date,displayName,media,profilePic
  // const {tweet} =prop;
  // const [userTweetText,setUserTweetText] = useState('');
  const [mediaReply,setMediaReply] = useState('');

  const [replies,setReplies] = useState([]);
  const toggleFileInput = (e) => {
    const fileInput = document.querySelector('#media');
    fileInput.click();
  }


  useEffect(()=>{
  console.log(login);
    
    console.log(prop);
    return() =>{
    }
  })

  const textAreaInput = (e) => {
    setReplyMiniText(e.target.value);
  }
 
      
const handleFileInput = (e) => {
    // e.preventDefault();
    // console.log(this.readFile(e.target.value)) 
    const reader = new FileReader();
    console.log(e.target.files)
    reader.addEventListener('load', () => {
      const holder = reader.result;
      const imgURL  = URL.createObjectURL(e.target.files[0]);
      setMediaReply({file: e.target.files[0] ,name:e.target.files[0].name, load:imgURL})
          // setMedia(reader.result);

    })
    console.log(e.target.files);
      reader.readAsDataURL(e.target.files[0]);
  }

const removeForm= (e)=>{
    console.log(e);
    setToggleFormHidden(true);
    e.stopPropagation()
}
  
const processFormData = (e) => {
e.preventDefault();
const date = new Date();
const dateString = date.toString();
const dateData = makeDatewithMS(dateString,date)
// console.log(newReplyData);
// will need to fix when query replies and to make sure i am updating the correct part within.
const holder = {user:login.email, displayName:login.displayName,profilePic: 
  login.photoURL,date:dateData, text:replyMiniText,reply:''}
  // tweet.date is a string right now
    addContinuousReply(holder,tweet.email,tweet.date,currentReply.date);
    // setNewReplyData('');
  // async function addContinuousReply(reply,tweetUser,textID,replyID){
    // const data = await setDoc(doc(db, 'users', `${tweetUser}`,'tweets',textID, 'replies', replyID), {
}
function makeDatewithMS(dateString,date){
  return dateString.substring(0,dateString.indexOf('GMT')-1) + '.' + date.getMilliseconds()+ ' ' + dateString.substring(dateString.indexOf('GMT'))
 }
if(!currentReply.user){
  return(
    <div>
    <button className={toggleFormHidden?"hidden":"fullscreen"}onClick={removeForm} type="button"></button>
      <form className={toggleFormHidden?"hidden":"minireply"}>
      <button  onClick={removeForm} type="button">X</button>


        <textarea placeholder="TWEET YOUR REPLY!" name="tweet" form="userform" value={replyMiniText} onChange={textAreaInput} required="required" minLength="1"></textarea>
        <label htmlFor="media"></label>
        <img className="mediaInput" src={mediaReply.load} width="250"></img>
        <div className="flexcol">
          <div onClick={toggleFileInput} className="material-icons">image
                <input onChange={handleFileInput} type="file" id="media" name="media" accept="image/png, image/jpeg, video/*, gif/*" ></input>
            </div>
        </div>
        {/* <input type="submit" value="Reply" onClick={processFormData} ></input> */}
      </form>
    </div>
  )
}else
  return (
    <div>
    <button className={toggleFormHidden?"hidden":"fullscreen"}onClick={removeForm} type="button"></button>
      <form className={toggleFormHidden?"hidden":"minireply"}>
      <button  onClick={removeForm} type="button">X</button>

    <Tweets key={currentReply.user+currentReply.date.substring(10,24)} text={currentReply.text} displayName ={currentReply.displayName} email ={currentReply.user}user={currentReply.user} media ={currentReply.media} date = {currentReply.date} login={login} profilePic={currentReply.profilePic}></Tweets>

        <textarea placeholder="TWEET YOUR REPLY!" name="tweet" form="userform" value={replyMiniText} onChange={textAreaInput} required="required" minLength="1"></textarea>
        <label htmlFor="media"></label>
        <img className="mediaInput" src={mediaReply.load} width="250"></img>
        <div className="flexcol">
          <div onClick={toggleFileInput} className="material-icons">image
                <input onChange={handleFileInput} type="file" id="media" name="media" accept="image/png, image/jpeg, video/*, gif/*" ></input>
            </div>
        </div>
        <input type="submit" value="Reply" onClick={processFormData} ></input>
      </form>
    </div>
  )

}

export default ReplyForm;