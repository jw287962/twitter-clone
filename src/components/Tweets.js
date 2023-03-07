
import React,{useState,useEffect} from "react";
import { Markup } from 'interweave';
import { Link } from "react-router-dom";
const Tweet = (props) => {

      const {text,user,media,date,email,displayName,profilePic} = props;
      const [origText,setNewText] = useState(text);
      const {login} = props
      const [dateNumber] = useState(new Date(date));
useEffect(()=>{
})


      if(media){
            console.log(props)
            return(
      <div className="tweet">
            <Link to={{
                        pathname: `/tweet/${user}/${dateNumber.getTime()}`,
                        }}
                        state={{ tweet: props,login: login,} }>
            <div className="flexrow tweetuser">
                    {/* <Link to={{pathname:"/shop/checkout" }} state={{ allProducts: allProducts}}><button >Checkout</button></Link> */}
                  <Link to={{
                        pathname: "/profile",
                        search: `?${email}`,
                        }}
                        state={{ login: login}}>
                          <h2><img className="profilePic"src={profilePic} height='25px'></img>{displayName} <span>@{user} </span></h2>
                             
                  </Link>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>
            <Markup content = {origText}></Markup>

              <img src={media} ></img>
              <div className="tweetbuttons">
              <Link to={{
                        pathname: `/tweet/${user}/${dateNumber.getTime()}`,
                        }}
                        state={{ tweet: props,login: login,} }>
                  <button className="tweetbutton"><span className="material-icons">chat_bubble</span></button>
                   </Link>
                  <button className="tweetbutton"><span className="material-icons">favorite</span></button>
                   <button className="tweetbutton"><span className="material-icons">share</span></button>
                   </div>
                   </Link>
      </div>
            )
      }
  return (
      <div className="tweet">
                <Link to={{
                        pathname: `/tweet/${user}/${dateNumber.getTime()}`,
                        }}
                        state={{ tweet: props,login: login,} }>
                  <div className="flexrow tweetuser">
                  <Link to={{
                        pathname: "/profile",
                        search: `?${email}`,
                        }}
                        state={{ ...props,login: login,} }>
                       <h2><img className="profilePic"src={profilePic} height='25px'></img>{displayName} <span>@{user} </span></h2>
                  </Link>
                  <p>{date.substring(date.indexOf(' '),21)}</p>
                        </div>

            <Markup content = {origText}></Markup>
            <div className="tweetbuttons">
                  <Link to={{
                        pathname: `/tweet/${user}/${dateNumber.getTime()}`,
                        }}
                        state={{ tweet: props,login: login,} }>
                  <button className="tweetbutton"><span className="material-icons">chat_bubble</span></button>
                   </Link>
                  <button className="tweetbutton"><span className="material-icons">favorite</span></button>
                   <button className="tweetbutton"><span className="material-icons">share</span></button>
                   </div>

            {/* <div className="replies">

            </div> */}
            </Link>
       </div>
  )
}

export default Tweet; 