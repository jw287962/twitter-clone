
import React,{useState,useEffect} from "react";
import { Markup } from 'interweave';
import { Link } from "react-router-dom";
const Tweet = (props) => {

      const {text,user,media,date} = props;
      const [origText,setNewText] = useState(text);
      const {login} = props

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
                    {/* <Link to={{pathname:"/shop/checkout" }} state={{ allProducts: allProducts}}><button >Checkout</button></Link> */}
                  <Link to={{
                        pathname: "/profile",
                        search: `?${user}`,
                        }}
                        state={{ login: login}}>
                        <h2>@{user} </h2>
                  </Link>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>
            <Markup content = {origText}></Markup>

              <img src={media} ></img>
              <div className="tweetbuttons">
                  <button className="tweetbutton"><span className="material-icons">chat_bubble</span></button> 
                  <button className="tweetbutton"><span className="material-icons">favorite</span></button>
                   <button className="tweetbutton"><span className="material-icons">share</span></button>
                   </div>
      </div>
            )
      }
  return (
      <div className="tweet">
                  <div className="flexrow tweetuser">
                  <Link to={{
                        pathname: "/profile",
                        search: `?${user}`,
                        hash: "",
                        state: { fromDashboard: true }
                        }}>
                        <h2>@{user} </h2>
                  </Link>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>

            <Markup content = {origText}></Markup>
            <div className="tweetbuttons">
                  <button className="tweetbutton"><span className="material-icons">chat_bubble</span></button> 
                  <button className="tweetbutton"><span className="material-icons">favorite</span></button>
                   <button className="tweetbutton"><span className="material-icons">share</span></button>
                   </div>
       </div>
  )
}

export default Tweet; 