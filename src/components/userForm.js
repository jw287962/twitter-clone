import React,{useState,useEffect} from "react";
import 'material-icons/iconfont/material-icons.css';


const Form = (props) => {

  const {login} = props;
const toggleFileInput = () => {
  const fileInput = document.querySelector('#media');
  fileInput.click();
  
}

  useEffect(() => {
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
      <textarea name="tweet" form="userform"></textarea>
      <label htmlFor="media"></label>
      <div>
        <button onClick={toggleFileInput} className="material-icons">image<input type="file" id="media" name="media" accept="image/png, image/jpeg, video/*"></input></button>
        
      </div>
   
      <input  type="submit" value="Tweet"></input>
    </form>
  )
}

export default Form; 
