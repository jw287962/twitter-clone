
import React,{useState,useEffect} from "react";
import { Markup } from 'interweave';
const Tweet = (props) => {

      const {text,user,media,date} = props;
      const [origText,setNewText] = useState(text);


useEffect(()=>{
      const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      if(origText ==text && urlRegex.test(text)){
            setNewText(linkify(origText));
      }

})

function linkify(text) {
      const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '">' + url + '</a>';
      });
  }

      if(media){
            return(
      <div className="tweet">
            <div className="flexrow tweetuser">
                  <h2>@{user} </h2>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>
            <Markup content = {origText}></Markup>

              <img src={media} ></img>
      </div>
            )
      }
  return (
      <div className="tweet">
            <div className="flexrow tweetuser">
                  <h2>@{user} </h2>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>

            <Markup content = {origText}></Markup>
       </div>
  )
}

export default Tweet; 