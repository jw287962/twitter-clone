import React,{useState,useEffect} from "react";
import './css/Middle.css'
import Tweet from "./Tweet";
import Form from "./userForm";
import { getUserAuth,queryData } from "./firebase";

const Middle = (props) => {

    const [tweetsData,setTweetsData] = useState([]);
    const [tweetsDataSliced,setTweetsDataSliced] = useState([]);
    const [loadLimiter, setLoadLimiter] = useState(5);
    
    const addFiveLimit = () => {
      setLoadLimiter(loadLimiter+5);
    }

  const {login} = props;
  useEffect(() => {
    console.log(tweetsData);
    if(tweetsData.length <=loadLimiter){
      // querySnapshotUpdate();
        console.log('query data again NO')
      queryData(tweetsData,setTweetsData);
    }
  },[loadLimiter])


  function isBottom(e) {
  
    if(tweetsData.length <= loadLimiter){
      return;
    }
    if(window.innerHeight*2 >= document.body.scrollHeight){
      if(Math.abs(document.body.scrollHeight-  window.innerHeight- window.pageYOffset) <=8){
        addFiveLimit();
      }
    }
   else if( window.pageYOffset >= window.innerHeight){
      addFiveLimit();
    }
    // console.log(document.body.scrollHeight,  'scrollehight of body');
    // console.log(window.innerHeight , 'innerheight screen')
    // console.log(window.outerHeight, ' outerheight, ')

    // console.log(window.pageYOffset);

  }
 useEffect(() => {
    document.addEventListener('scroll',isBottom);

  if(tweetsDataSliced.length !== loadLimiter){
    console.log('slice data');
    // querySnapshotUpdate();
      setTweetsDataSliced(tweetsData.slice(0,loadLimiter));
  }


 },[tweetsData,loadLimiter])

 useEffect(()=> {

 },)
// async function querySnapshotUpdate(){
//   const querySnapshot = await queryData(tweetsData,setTweetsData);
//   const newArray = [];
  
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     const array = [doc.data()];
//     setTweetsData(tweetsData.concat(array[0]))

//   });

// }
  return (
    <main className="content">
      <Form login={login}></Form>
      {/* text,user,media,date */}
      {tweetsDataSliced.map((tweet) => {
       
      return(
        
          <Tweet key={tweet.user +tweet.date.substring(10,23)}text={tweet.text} user={tweet.user} media ={tweet.media} date = {tweet.date}></Tweet>
      )
      })

      }
    </main>
  )
}

export default Middle; 
