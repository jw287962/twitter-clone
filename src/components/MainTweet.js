
import React,{useState,useEffect} from "react";
import Tweets from "./Tweets";
import { Link } from "react-router-dom";
import { uploadImage,addReplyFirebase,queryTweetSingle,queryReplyFirebase} from "./firebase";
import { useLocation } from "react-router-dom";
import Reply from "./Reply";
import {getDownloadURL} from "firebase/storage";
const MainTweet = (prop) => {

  let data = useLocation();
  const [tweetUser] = useState(data.pathname.substring(7)); 
  const [tweetID] = useState(data.search.substring(1));
  const [tweet,setTweet] = useState(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [loadLimiter, setLoadLimiter] = useState(5);

  const {login} = prop;
  const [userTweetText,setUserTweetText] = useState('');
  const [media,setMedia] = useState('');

  const [replies,setReplies] = useState([]);

  useEffect(()=>{
    if(!prop.tweet && !tweet){
      queryTweetSingle(tweetUser,tweetID,setTweet);

    }
  },[tweet]);

  useEffect(()=>{
   async function queryReplies(){
    await queryReplyFirebase(tweetUser,tweetID,setReplies,setLoadingData);
      setLoadingData(false);
    }
    
    queryReplies();

  },[loadLimiter]);

  useEffect(() => {
    document.addEventListener('scroll',isBottom);
    return () => document.removeEventListener("keyup", isBottom);
  },[]);

  const addFiveLimit = () => {
    setLoadLimiter(loadLimiter+5);
  }
  function isBottom(e) {
  
    if(replies.length <= loadLimiter){
      return;
    }
    if(window.innerHeight*2 >= document.body.scrollHeight){
      if(Math.abs(document.body.scrollHeight-  window.innerHeight- window.pageYOffset) <=8){
        addFiveLimit();
      }
    }
   else if( window.pageYOffset >= window.innerHeight){
      addFiveLimit();
    }}


  const toggleFileInput = (e) => {
    const fileInput = document.querySelector('#media');
    fileInput.click();
  }


  const textAreaInput = (e) => {
    setUserTweetText(e.target.value);
  }
  const handleFileInput = (e) => {
    // e.preventDefault();
    // console.log(this.readFile(e.target.value)) 
    const reader = new FileReader();
    console.log(e.target.files)
    reader.addEventListener('load', () => {
      const holder = reader.result;
      const imgURL  = URL.createObjectURL(e.target.files[0]);
      setMedia({file: e.target.files[0] ,name:e.target.files[0].name, load:imgURL})
          // setMedia(reader.result);

    })
    console.log(e.target.files);

      reader.readAsDataURL(e.target.files[0]);
  }

  const processReplyData = (e) => {

    e.preventDefault();
    if(media){
      // const img = document.querySelector('#media');
      // console.log(img.files[0])
      // const imgURL  = URL.createObjectURL(img.files[0]);
      // console.log(imgURL);
      const uploadTask = uploadImage(media);
      // NEED TO CHANGE TO ADDREPLY
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        addReplyFirebase(userTweetText,tweetID,downloadURL) 
      });
    }
    else{
      addReplyFirebase(userTweetText,tweetID);
    }
    
    setUserTweetText('');
    setMedia('');
  }

  if(!tweet){
    return(
    <main className="content">
    {<div id={!loadingData? 'hidden': 'loader'} > </div>}
  </main>
    )
  }
  else{

  return (
    
        <main className="content">
              <Tweets key={tweet.user+tweet.date.substring(10,24)} text={tweet.text} displayName ={tweet.displayName} email ={tweet.email}user={tweet.user} media ={tweet.media} date = {tweet.date} login={login} profilePic={tweet.profilePic}></Tweets>

              <form className="tweetform" id="replyform">
        <h3>Hi, {login.displayName.substring(0,login.displayName.indexOf(' '))}</h3>
        <textarea name="tweet" form="replyform" value={userTweetText} onChange={textAreaInput}></textarea>
        <label htmlFor="media"></label>
        <img className="mediaInput" src={media.load} width="250"></img>

        <div className="flexcol">

          <div onClick={toggleFileInput} className="material-icons">image
                <input onChange={handleFileInput} type="file" id="media" name="media" accept="image/png, image/jpeg, video/*, gif/*" ></input>
            </div>
        </div>
    
        <input type="submit" value="Reply" onClick={processReplyData} ></input>
      </form>

          <div className="replyContainer">
            {replies.map((reply)=> {
              console.log(reply);
              return(
            
                  <Reply key={reply.name+reply.date} {...reply}></Reply>
              )
            })
          }
          </div>

        </main>
  )
}
}

export default MainTweet; 