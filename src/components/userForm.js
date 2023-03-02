import React,{useState,useEffect} from "react";
import 'material-icons/iconfont/material-icons.css';
import { uploadImage,addTweetFireBase } from "./firebase";
import {getDownloadURL} from "firebase/storage";
import { getAuth } from "firebase/auth";
const Form = (props) => {

  const {login} = props;

  const [userTweetText,setUserTweetText] = useState('');
  const [media,setMedia] = useState('');

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
  
  const processTweetData = (e) => {

    e.preventDefault();

    console.log(media);
if(media){
  // const img = document.querySelector('#media');
  // console.log(img.files[0])
  // const imgURL  = URL.createObjectURL(img.files[0]);
  // console.log(imgURL);
  const uploadTask = uploadImage(media);
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {addTweetFireBase(userTweetText,downloadURL)  });
}
 else{
  addTweetFireBase(userTweetText, "");
 }

//  setUserTweetText('');
//  setMedia('');
  }



  useEffect(() => {
    console.log(getAuth().currentUser)
  })
  if(!login){
    return(
      <form id="userform">
      <h3>Please Login</h3>
      <textarea name="tweet" form="userform"></textarea>
    
    </form>
    )
  }

  return (
    <form id="userform">
      <h3>Hi, {login.displayName.substring(0,login.displayName.indexOf(' '))}</h3>
      <textarea name="tweet" form="userform" value={userTweetText} onChange={textAreaInput}></textarea>
      <label htmlFor="media"></label>

      <div className="flexcol">
      <img className="mediaInput" src={media.load} width="250"></img>

        <div onClick={toggleFileInput} className="material-icons">image
              <input onChange={handleFileInput} type="file" id="media" name="media" accept="image/png, image/jpeg, video/*, gif/*" ></input>
          </div>
      </div>
   
      <input type="submit" value="Tweet" onClick={processTweetData} ></input>
    </form>
  )
}

export default Form; 
