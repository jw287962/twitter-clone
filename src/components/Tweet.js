
import React,{useState,useEffect} from "react";
const Tweet = (props) => {

      const {text,user,media,date} = props

useEffect(()=>{
      console.log(media);
})

      if(media){
            return(
      <div className="tweet">
            <div className="flexrow tweetuser">
                  <h3>@{user} </h3>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>
            <p>{text}</p>
              <img src={media} height="100"></img>
      </div>
            )
      }
  return (
      <div className="tweet">
            <div className="flexrow tweetuser">
                  <h3>@{user} </h3>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>

            <p>{text}</p>
       </div>
  )
}

export default Tweet; 