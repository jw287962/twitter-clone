
import React,{useState,useEffect} from "react";
const Tweet = (props) => {

      const {text,user,media,date} = props

useEffect(()=>{
      console.log(media);
})

      if(media){
            return(
      <button className="tweet">
            <h3>@{user} </h3>
            <p>{text}</p>
              <img src={media} height="100"></img>
            <p>{date.substring(0,12)}</p>
      </button>
            )
      }
  return (
      <button className="tweet">
            <h3>@{user} </h3>
            <p>{text}</p>
            <p>{date.substring(0,21)}</p>
       </button>
  )
}

export default Tweet; 