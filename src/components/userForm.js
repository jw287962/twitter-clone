import React,{useState} from "react";

const Form = (props) => {

  const {login} = props;


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
      <span className="material-symbols-outlined"> <input type="file" id="media" name="media" accept="image/png, image/jpeg, video/*"></input></span>
   
      <input  type="submit" value="Tweet"></input>
    </form>
  )
}

export default Form; 
