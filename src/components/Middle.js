import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Router";
import "./css/Middle.css";
import Tweets from "./Tweets";
import MainTweetForm from "./FormReply/MainTweetForm";
import { getUserAuth, queryData, querySearchTerm } from "./firebase";

const Middle = ({ searchTerm }) => {
  const user = useContext(UserContext);

  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsDataSliced, setTweetsDataSliced] = useState([]);
  const [loadLimiter, setLoadLimiter] = useState(5);
  const [loadingData, setLoadingData] = useState(false);

  const { login, signInUser } = user;
  useEffect(() => {
    async function queryTweetData() {
      await queryData(setTweetsData, setLoadingData);
    }
    if (searchTerm) {
      querySearchTerm(setTweetsData, searchTerm);
    } else {
      queryTweetData(setTweetsData, searchTerm);
    }
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
  }
  useEffect(() => {
    document.addEventListener("scroll", isBottom);

    if (tweetsDataSliced.length !== loadLimiter && !loadingData) {
      // querySnapshotUpdate();
      const arrayHolder = tweetsData.slice(0, loadLimiter);
      setTweetsDataSliced(arrayHolder);
    }

    return () => document.removeEventListener("keyup", isBottom);
  }, [tweetsData, loadLimiter, loadingData]);

  useEffect(() => {
    console.log("ness");
    const arrayHolder = tweetsData.slice(0, loadLimiter);
    setTweetsDataSliced(arrayHolder);
  }, [tweetsData]);
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
            likes={tweet.likes}
            setTweetsData={setTweetsData}
            setLoadingData={setLoadingData}
            searchTerm={searchTerm}
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
