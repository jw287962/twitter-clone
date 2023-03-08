import { Markup } from "interweave";
import './css/Replies.css'

const Reply = (props) => {
  const {profilepic,date,media,user,displayName,text} = props;



  return (
    <div className="reply">
    
      <div className="flexrow tweetuser">
     
           <h2><img className="profilePic"src={profilepic} height='25px'></img>{displayName} <span>@{user.substring(0,user.indexOf('@'))} </span></h2>
     
      <p>{date.substring(date.indexOf(' '),21)}</p>
            </div>

          <Markup content = {text}></Markup>
          <div className="tweetbuttons">
      
      <button className="tweetbutton"><span className="material-icons">chat_bubble</span></button>
      <button className="tweetbutton"><span className="material-icons">favorite</span></button>
       <button className="tweetbutton"><span className="material-icons">share</span></button>
       </div>


</div>
  )
}

export default Reply;