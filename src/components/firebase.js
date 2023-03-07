import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { signOut } from "firebase/auth";
import { getStorage, ref,uploadBytesResumable,uploadBytes , getDownloadURL} from "firebase/storage";
import { getFirestore,doc, setDoc ,getDoc, getDocs, collection, query,where,} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBs5UoohIyhXZaToPPTevEfM7tHWwFALUk",
  authDomain: "twitter-clone-33714.firebaseapp.com",
  projectId: "twitter-clone-33714",
  storageBucket: "twitter-clone-33714.appspot.com",
  messagingSenderId: "977024522205",
  appId: "1:977024522205:web:57e9a73496d1d9ff040834"
};
const user = initializeApp(firebaseConfig);
const auth = getAuth();

 function signInPopUp(){
  const provider = new GoogleAuthProvider();
  const signedIn = 0;
  
  const promise = signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      
    }).catch((error) => {
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

function signOutUser(){
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });  
}

function getUserAuth() {
  return getAuth();
}

function uploadImage(img){
// Create a root reference
  const storage = getStorage();
  var file = new File([img.file], "name");
  console.log(file);
  const storageRef = ref(storage, img.name);
  const metadata = {
    contentType: 'image/jpeg',
  };

  console.log(img.file);
  const uploadTask = uploadBytesResumable(storageRef,file ,metadata)
  // .then((snapshot) => {
  //   console.log(snapshot);
  //   console.log('Uploaded a blob or file!');
  // });;

  uploadTask.on('state_changed', 
    (snapshot) => {
      console.log(snapshot);
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
  (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }

    }, 
    () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      });
     } 
  );
  return uploadTask;
}

async function addTweetFireBase(text,url){

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const user = getAuth().currentUser;

  const date = Date();
// Add a new document in collection jasonwong28798
// await setDoc(doc(db, user.substring(0,user.indexOf('@')), `tweet${date}`), {
  // const currentUser = collection(db, 'users', `${user.substring(0,user.indexOf('@'))}`,'tweets',`${date}`)
  await setDoc(doc(db, 'users', `${user.email}`,'tweets',`${date}`), {
  text: text,
  media: url,
  user: user.email.substring(0,user.email.indexOf('@')),
  displayName: user.displayName,
  email: user.email,
  date: date,
  likes:0 ,

  });

}

async function addUserFirebase(){

  const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const user = await getAuth().currentUser;
    const date = Date();
  // Add a new document in collection "cities"
    await setDoc(doc(db, 'users', user.email), {
    user: user.email,
    date: date,
    displayName: user.displayName,
    birthdate: '00/00/0000',
    name: user.displayName,
    background: 'unset image',
    profilepic: 'no profile pic',
  });
}
async function getUserData(searchParam = auth.currentUser.email,setLoadingData,setUser){
  setLoadingData(true);
  if(!searchParam) {
    searchParam = getAuth().currentUser.email
  }
  console.log('query',searchParam)
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const allUsers =  query(doc(db,'users',`${searchParam}`));
  const allUserSnapshot = await getDoc(allUsers);
  setLoadingData(false);
  console.log(allUserSnapshot.data())
  // prob better when more users, to change to followers or something instead of all users or if users > 30
  if(allUserSnapshot.data() === undefined){
    
    setUser({user: {user: 'no user found',email: 'n/a'}});

  }
  setUser(allUserSnapshot.data());

}

// if user clicks  a tweet, should load replies  and be able to reply with new form from (addReplyFirebase)
function addReplyFirebase(){

}

function queryReplyFirebase(){
  
}


  // add seconds instad of just minte in data collection name and query by date or something

async function queryData(tweetsData,setTweetsData,setLoadingData){
  setLoadingData(true);
  console.log('auth',getAuth().currentUser);
  console.log('query')
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const allUsers =  query(collection(db,'users'));
  const allUserSnapshot = await getDocs(allUsers);
  // prob better when more users, to change to followers or something instead of all users or if users > 30
  // const usersArray = [];
  const newArray = [];

   const data =allUserSnapshot.forEach(async (doc) => {
      // usersArray.push(doc.data());
      console.log(doc.data(),"users")
      const q = query(collection(db, 'users',doc.data().user,'tweets'));
          
      // const docSnap = await getDoc(docRef);
      const tweetsSnapshot = await getDocs(q);
      console.log(tweetsSnapshot)
      // return querySapshot;
       await tweetsSnapshot.forEach( (doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data())
        console.log(doc.data());
         newArray.push(doc.data());
   })
    setTweetsData(newArray.concat([])); 
   });
   
}

export { signInPopUp,signOutUser,getUserAuth, addTweetFireBase,uploadImage,queryData, addUserFirebase, getUserData};
