import { useState,useEffect } from "react";
import {uploadImage,getDownloadURL ,addContinuousReply} from "./firebase";
import { useLocation } from "react-router-dom";
import Tweets from "./Tweets";
const MiniReplyForm = (prop) =>{
// get tweetID and user of original tweet
  const {login,toggleFormHidden,setToggleFormHidden,tweet,setReplyMiniText,replyMiniText,newReplyData,setNewReplyData
    ,setCurrentMiniReply,currentMiniReply,replyData,setCurrentReplyData,currentReplyData} = prop;

  const {currentReply} = prop;
  // ,user,text,date,displayName,media,profilePic
  // const {tweet} =prop;
  // const [userTweetText,setUserTweetText] = useState('');
  const [mediaReply,setMediaReply] = useState('');


    // const [newReplyData,setNewReplyData] =useState('');
  const [replies,setReplies] = useState([]);
  const toggleFileInput = (e) => {
    const fileInput = document.querySelector('#media');
    fileInput.click();
  }


  useEffect(()=>{
  console.log(currentMiniReply);
    
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
  
const processReplyFormData = (e) => {
e.preventDefault();
makeNewReplyData();

const date = new Date();
const dateString = date.toString();
const dateData = makeDatewithMS(dateString,date)
console.log(currentReplyData);
// will need to fix when query replies and to make sure i am updating the correct part within.
const holder = currentMiniReply
  // tweet.date is a string right now
  console.log(tweet, 'HUH?')
    addContinuousReply(holder,tweet.email,tweet.date,currentReplyData.date);
    setNewReplyData('');
    setReplyMiniText('');
  // async function addContinuousReply(reply,tweetUser,textID,replyID){
    // const data = await setDoc(doc(db, 'users', `${tweetUser}`,'tweets',textID, 'replies', replyID), {
}

const makeNewReplyData = (e) => {
  // setCurrentReply(reply);
  // const replyDiv = e.target.parentElement.parentElement.parentElement
  setToggleFormHidden(false);
  // query reply 
  let replyDataHolder = currentMiniReply;
  const array = [];
  let string ='reply';
  let i = 0;
  console.log(currentMiniReply);
  // if(currentMiniReply==='') return;
  
  while(replyDataHolder.reply){
    i++;
    // array.push(replyDataHolder.reply);
    replyDataHolder = replyDataHolder.reply;
  }
  console.log(i , currentMiniReply);

  looper(currentMiniReply);
  console.log(currentMiniReply);
  setNewReplyData(currentMiniReply);
}


const looper = (replyDataFunc) => {
  console.log('loop')
  console.log(replyDataFunc);
  
  for(const key in replyDataFunc){
    if(key === 'reply'){
      console.log(replyDataFunc['reply']);
     if(replyDataFunc['reply'] === ''){
 
   
        const date = new Date();
  const dateString = date.toString();
  const dateData = makeDatewithMS(dateString,date)
        const holder = {user:login.email, displayName:login.displayName,
          profilePic: login.photoURL,date:dateData, text:replyMiniText,reply:""}
        replyDataFunc.reply = holder;
        console.log(replyDataFunc);
     }else
      looper(replyDataFunc['reply']);

    }else 
    if(key === 'date'|| key === 'displayName' || key === 'media' || key === 'profilePic' || key === 'text' || key === 'user'){}
    

  }

  
  console.log(currentReplyData);
}

function makeDatewithMS(dateString,date){
  return dateString.substring(0,dateString.indexOf('GMT')-1) + '.' + date.getMilliseconds()+ ' ' + dateString.substring(dateString.indexOf('GMT'))
 }
if(!currentMiniReply.user){
  return(
    <div>
    <button className={toggleFormHidden?"hidden":"fullscreen"}onClick={removeForm} type="button"></button>
      <form className={toggleFormHidden?"hidden":"minireply"}>
      <button  onClick={removeForm} type="button">X</button>


        <textarea name="tweet" form="userform" value={replyMiniText} onChange={textAreaInput} required="required" minLength="1"></textarea>
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

    {/* <Tweets key={currentReply.user+currentReply.date.substring(10,24)} text={currentReply.text} displayName ={currentReply.displayName} email ={currentReply.user}user={currentReply.user} media ={currentReply.media} date = {currentReply.date} login={login} profilePic={currentReply.profilePic}></Tweets> */}
    <Tweets key={currentMiniReply.user+currentMiniReply.date.substring(10,24)} text={currentMiniReply.text} displayName ={currentMiniReply.displayName} email ={currentMiniReply.user}user={currentMiniReply.user} media ={currentMiniReply.media} date = {currentMiniReply.date} login={login} profilePic={currentMiniReply.profilePic}></Tweets>
        <textarea name="tweet" form="userform" value={replyMiniText} onChange={textAreaInput} required="required" minLength="1"></textarea>
        <label htmlFor="miniMedia"></label>
        <img className="mediaInput" src={mediaReply.load} width="250"></img>
        <div className="flexcol">
          <div onClick={toggleFileInput} className="material-icons">image
                <input onChange={handleFileInput} type="file" id="miniMedia" name="media" accept="image/png, image/jpeg, video/*, gif/*" ></input>
            </div>
        </div>
        <input type="submit" value="Reply" onClick={processReplyFormData} ></input>
      </form>
    </div>
  )

}

export default MiniReplyForm;