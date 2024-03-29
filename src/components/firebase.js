import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import moment from "moment";
import { signOut } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  orderBy,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  increment,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs5UoohIyhXZaToPPTevEfM7tHWwFALUk",
  authDomain: "twitter-clone-33714.firebaseapp.com",
  projectId: "twitter-clone-33714",
  storageBucket: "twitter-clone-33714.appspot.com",
  messagingSenderId: "977024522205",
  appId: "1:977024522205:web:57e9a73496d1d9ff040834",
};
const user = initializeApp(firebaseConfig);
const auth = getAuth();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function signInPopUp() {
  const provider = new GoogleAuthProvider();

  const promise = signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  return promise;
}

function signOutUser() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

function getUserAuth() {
  return getAuth();
}

function uploadImage(img) {
  // Create a root reference
  const storage = getStorage();
  var file = new File([img.file], "name");
  // console.log(file);
  const storageRef = ref(storage, img.name);
  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  return new Promise((resolve) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Neither paused nor running upload");
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("Neither Unauthorized/canceled/unknown");
        }
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}

async function addTweetFireBase(text, url) {
  if (!text) return;

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const user = getAuth().currentUser;

  const date = new Date();
  const dateString = date.toString();

  await setDoc(doc(db, "tweets", `${date.getTime()}`), {
    text: text,
    media: url,
    user: user.email.substring(0, user.email.indexOf("@")),
    displayName: user.displayName,
    email: user.email,
    profilePic: user.photoURL,
    date: makeDatewithMS(dateString, date),
    likes: 0,
  });
}

async function addUserFirebase() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const user = await getAuth().currentUser;
  const date = Date();
  // Add a new document in collection "cities"
  await setDoc(doc(db, "users", user.email), {
    user: user.email,
    date: date,
    displayName: user.displayName,
    birthdate: "00/00/0000",
    name: user.displayName,
    background: "unset image",
    profilepic: user.photoURL,
    following: [],
  });
}

async function getUserData(
  searchParam = auth.currentUser.email,
  setLoadingData,
  setUser
) {
  setLoadingData(true);
  if (!searchParam) {
    searchParam = getAuth().currentUser.email;
  }
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const allUsers = query(doc(db, "users", `${searchParam}`));
  const allUserSnapshot = await getDoc(allUsers);
  setLoadingData(false);
  console.log(allUserSnapshot.data());
  // prob better when more users, to change to followers or something instead of all users or if users > 30
  if (allUserSnapshot.data() === undefined) {
    setUser({ user: { user: "no user found", email: "n/a" } });
  }
  setUser(allUserSnapshot.data());
}

// if user clicks  a tweet, should load replies  and be able to reply with new form from (addReplyFirebase)
async function addReplyFirebase(textData, textID, tweetUser, downloadURL = "") {
  if (!textData) return;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const user = auth.currentUser;

  const date = new Date();
  const dateString = date.toString();

  return new Promise(async (resolve) => {
    const finish = await setDoc(
      doc(db, "tweets", textID, "replies", `${date.getTime()}`),
      {
        user: user.email,
        date: makeDatewithMS(dateString, date),
        displayName: user.displayName,
        profilePic: user.photoURL,
        text: textData,
        media: downloadURL,
        reply: [],
      }
    );

    resolve(finish);
  });
}

async function queryReplyFirebase(
  tweetUser,
  textID,
  setReplies,
  setLoadingData
) {
  setLoadingData(true);
  const allReplies = query(collection(db, "tweets", textID, "replies"));
  const allRepliesSnapshot = await getDocs(allReplies);
  const array = [];
  allRepliesSnapshot.forEach(async (doc) => {
    array.push(doc.data());

    setReplies(array);
  });
  // console.log(array);
}

// add seconds instad of just minte in data collection name and query by date or something

async function queryData(
  setTweetsData,
  setLoadingData,
  innerTweet = false,
  searchTerm = ""
) {
  try {
    if (innerTweet) {
      // queryTweetSingle(tweetIdDate, setTweet);
    }
    setLoadingData(true);
    // console.log('auth',getAuth().currentUser);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const tweetRef = collection(db, "tweets");
    let allTweets = undefined;
    if (searchTerm) {
      allTweets = query(tweetRef, where("text", "==", searchTerm));
    } else {
      allTweets = query(tweetRef, orderBy("date"));
    }

    const allTweetsSnapshot = await getDocs(allTweets);

    const newArray = [];

    const data = allTweetsSnapshot.forEach(async (doc) => {
      newArray.push(doc.data());

      setLoadingData(false);
      setTweetsData(newArray.concat([]));
    });
  } catch (e) {
    console.log("queryData", e);
    return new Error(e);
  }
}

// QUERY THE TWEET DATA
async function queryTweetSingle(tweetIDDate, setTweet) {
  try {
    const user = query(doc(db, "tweets", `${tweetIDDate}`));
    console.log(user);
    const allUserSnapshot = await getDoc(user);
    // prob better when more users, to change to followers or something instead of all users or if users > 30
    const data = allUserSnapshot;
    setTweet(data.data());
  } catch (e) {
    console.log("query tweet single", e);
  }
}

async function queryContinuousReply(
  textID,
  replyID,
  setReplyData,
  setQueryReply
) {
  const replies = query(doc(db, "tweets", textID, "replies", getDate(replyID)));
  const allRepliesSnapshot = await getDoc(replies);

  // need to chnage to array of replies objects
  setReplyData(allRepliesSnapshot.data());

  if (setQueryReply) setQueryReply(true);
}

// all deeper replies
// USES ARRAYREPLYNUM TO FIGURE OUT WHICH ARRAY TO CHANGE. need to add a new reply array at the number
async function addMiniReplies(
  tweetUser,
  textID,
  replyID,
  arrayReplyNum,
  holder
) {
  console.log(getDate(textID), replyID);
  const replies = query(
    doc(db, "tweets", getDate(textID), "replies", getDate(replyID))
  );
  const allRepliesSnapshot = await getDoc(replies);
  // console.log(allRepliesSnapshot.data());
  const originalReply = allRepliesSnapshot.data();
  // DO THIS FOR ONLY STRING LENGHT OF 1 (JUST NUMBER):
  const orignalReplyArrayData = originalReply.reply;
  if (typeof arrayReplyNum == "number") {
    orignalReplyArrayData.push(holder);
    addContinuousReply(orignalReplyArrayData, tweetUser, textID, replyID);
  } else {
    // need to loop trhough all the replies
    const newArray = arrayReplyNum.split(",");
    var arrayHolder = originalReply;

    while (newArray.length > 1) {
      const number = Number(newArray.splice(1, 1));
      arrayHolder = arrayHolder.reply[number];
    }

    arrayHolder.reply.push(holder);
    addContinuousReply(orignalReplyArrayData, tweetUser, textID, replyID);
  }
}

// first reply
async function addSecondaryReply(
  holder,
  tweetUser,
  textID,
  replyID,
  setReplyData
) {
  try {
    const replies = query(
      doc(db, "tweets", getDate(textID), "replies", getDate(replyID))
    );
    const allRepliesSnapshot = await getDoc(replies);
    const originalReply = await allRepliesSnapshot.data();
    holder.arrayPosition = originalReply.reply.length;
    // console.log(holder);
    originalReply.reply.push(holder);

    // need to chnage to array of replies objects
    await setReplyData(originalReply.reply.concat([]));
    addContinuousReply(originalReply.reply, tweetUser, textID, replyID);
  } catch (e) {
    console.log("addsecondaryreply", e);
  }
}

// change to just for arrays of one reply
async function addContinuousReply(reply, tweetUser, textID, replyID) {
  try {
    // const date = new Date();

    const data = await setDoc(
      doc(db, "tweets", getDate(textID), "replies", getDate(replyID)),
      {
        reply: reply,
      },
      { merge: true }
    );
  } catch (e) {
    console.log("addContinuousReply", e);
  }
}

async function incrementLikes(email, dateid) {
  const tweet = doc(db, "tweets", `${getDate(dateid)}`);

  await updateDoc(tweet, {
    likes: increment(1),
  });
}

export async function querySearchTerm(setSearchData, searchTerm) {
  console.log(searchTerm);
  const tweetRef = collection(db, "tweets");

  const tweets = query(tweetRef, where("text", "==", searchTerm));
  const tweetSnapshot = await getDocs(tweets);
  const array = [];
  tweetSnapshot.forEach(async (doc) => {
    array.push(doc.data());
  });
  console.log(array);
  setSearchData(array);
}

// `###  Utility   `
function makeDatewithMS(dateString, date) {
  if (date.getMilliseconds() <= 99)
    return (
      dateString.substring(0, dateString.indexOf("GMT") - 1) +
      ".0" +
      date.getMilliseconds() +
      " " +
      dateString.substring(dateString.indexOf("GMT"))
    );
  return (
    dateString.substring(0, dateString.indexOf("GMT") - 1) +
    "." +
    date.getMilliseconds() +
    " " +
    dateString.substring(dateString.indexOf("GMT"))
  );
}
function getDate(date) {
  // const dateObject = new Date(date);
  const convertmmddyy = date.substring(0, date.indexOf("2023") + 4);
  var firstDate = moment(convertmmddyy).format("YYYY-MM-DD");
  const dateObj = new Date(
    firstDate + date.substring(date.indexOf(2023) + 4, date.indexOf("GMT") - 1)
  );
  return `${dateObj.getTime()}`;
}
export {
  getDate,
  signInPopUp,
  signOutUser,
  getUserAuth,
  addTweetFireBase,
  uploadImage,
  queryData,
  addUserFirebase,
  addReplyFirebase,
  queryReplyFirebase,
  addMiniReplies,
  getUserData,
  queryTweetSingle,
  queryContinuousReply,
  addContinuousReply,
  addSecondaryReply,
  incrementLikes,
};
