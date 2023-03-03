import React,{useState,useEffect} from "react";
import './css/Middle.css'
import Tweet from "./Tweet";
import Form from "./userForm";
import { getUserAuth,queryData } from "./firebase";

const Middle = (props) => {

    const [tweetsData,setTweetsData] = useState([]);


  const {login} = props;
 useEffect(() => {
  console.log(tweetsData);
  if(tweetsData.length === 0){
    // querySnapshotUpdate();
      console.log('query data again NO')
    queryData(tweetsData,setTweetsData);
  }

 })
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
      {tweetsData.map((tweet) => {
      return(
        
          <Tweet key={tweet.user +tweet.date.substring(10,23)}text={tweet.text} user={tweet.user} media ={tweet.media} date = {tweet.date}></Tweet>
      )
      })

      }
    </main>
  )
}

export default Middle; 
