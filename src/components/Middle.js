import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Router";
import "./css/Middle.css";
import Tweets from "./Tweets";
import MainTweetForm from "./FormReply/MainTweetForm";
import { getUserAuth, queryData } from "./firebase";

const Middle = (props) => {
  const user = useContext(UserContext);

  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsDataSliced, setTweetsDataSliced] = useState([]);
  const [loadLimiter, setLoadLimiter] = useState(5);
  const [loadingData, setLoadingData] = useState(false);

  const { login, signInUser } = user;
  useEffect(() => {
    async function queryTweetData() {
      if (tweetsData.length <= loadLimiter) {
        // querySnapshotUpdate();
        const holderData = await queryData(
          tweetsData,
          setTweetsData,
          setLoadingData
        );
        //  console.log(holderData);
        setLoadingData(false);
      }
    }
    queryTweetData();
  }, [loadLimiter]);

  const addFiveLimit = () => {
    setLoadLimiter(loadLimiter + 5);
  };
  function isBottom(e) {
    if (tweetsData.length <= loadLimiter) {
      return;
    }
    if (window.innerHeight * 2 >= document.body.scrollHeight) {
      if (
        Math.abs(
          document.body.scrollHeight - window.innerHeight - window.pageYOffset
        ) <= 8
      ) {
        addFiveLimit();
      }
    } else if (window.pageYOffset >= window.innerHeight) {
      addFiveLimit();
    }
    // console.log(document.body.scrollHeight,  'scrollehight of body');
    // console.log(window.innerHeight , 'innerheight screen')
    // console.log(window.outerHeight, ' outerheight, ')

    // console.log(window.pageYOffset);
  }
  useEffect(() => {
    document.addEventListener("scroll", isBottom);

    console.log(loadingData);
    if (tweetsDataSliced.length !== loadLimiter && !loadingData) {
      console.log("slice data");
      // querySnapshotUpdate();
      console.log(tweetsData);
      const arrayHolder = tweetsData.slice(0, loadLimiter);
      setTweetsDataSliced(arrayHolder);
      console.log(arrayHolder, loadLimiter, tweetsData);
    }

    return () => document.removeEventListener("keyup", isBottom);
  }, [tweetsData, loadLimiter, loadingData]);

  useEffect(() => {
    console.log(props.login);
  });
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
      <MainTweetForm login={login} signInUser={signInUser}></MainTweetForm>
      {/* text,user,media,date */}
      {tweetsDataSliced.map((tweet) => {
        return (
          //
          <Tweets
            key={tweet.user + tweet.date.substring(10, 24)}
            text={tweet.text}
            displayName={tweet.displayName}
            email={tweet.email}
            user={tweet.user}
            media={tweet.media}
            date={tweet.date}
            login={login}
            profilePic={tweet.profilePic}
          >
            TEST
          </Tweets>
        );
      })}
      {<div id={!loadingData ? "hidden" : "loader"}> </div>}
    </main>
  );
};

export default Middle;
