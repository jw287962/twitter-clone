import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { signOut } from "firebase/auth";
import { getStorage, ref,uploadBytesResumable,uploadBytes , getDownloadURL} from "firebase/storage";
import { getFirestore,doc, setDoc ,getDoc, getDocs, collection, query,where} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBs5UoohIyhXZaToPPTevEfM7tHWwFALUk",
  authDomain: "twitter-clone-33714.firebaseapp.com",
  projectId: "twitter-clone-33714",
  storageBucket: "twitter-clone-33714.appspot.com",
  messagingSenderId: "977024522205",
  appId: "1:977024522205:web:57e9a73496d1d9ff040834"
};
const user = initializeApp(firebaseConfig);


 function signInPopUp(){
  const provider = new GoogleAuthProvider();
  const signedIn = 0;
  const auth = getAuth();
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
  const user = getAuth().currentUser.email;
  const date = Date();
// Add a new document in collection "cities"
await setDoc(doc(db, user.substring(0,user.indexOf('@')), `tweet${date}`), {
  text: text,
  media: url,
  user: user.substring(0,user.indexOf('@')),
  date: date,
  likes:0 ,

});

// await setDoc(doc(db, 'alltweets', `${user.substring(0,user.indexOf('@'))}${date}`), {
//   text: text,
//   media: url,
//   user: user.substring(0,user.indexOf('@')),
//   date: date,

// });
}

async function addUserFirebase(){

  const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const user = getAuth().currentUser.email;
    const date = Date();
  // Add a new document in collection "cities"
  await setDoc(doc(db, 'users', user), {
    user: user.substring(0,user.indexOf('@')),
    date: date,
    
  });
  
  // await setDoc(doc(db, 'alltweets', `${user.substring(0,user.indexOf('@'))}${date}`), {
  //   text: text,
  //   media: url,
  //   user: user.substring(0,user.indexOf('@')),
  //   date: date,
  
  // });
  }


async function queryData(tweetsData,setTweetsData){
  console.log('query')
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const allUsers =  query(collection(db,'users'));
  const allUserSnapshot = await getDocs(allUsers);
  // prob better when more users, to change to followers or something instead of all users or if users > 30
  const usersArray = [];
   allUserSnapshot.forEach((doc) => {
      usersArray.push(doc.data());
   })
const newArray = [];

   usersArray.forEach(async element => {
            const q = query(collection(db, element.user));
          
        // const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(q);
        // return querySnapshot;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          const tweet = doc.data();
          console.log(tweet);
          newArray.push(tweet);
        });

setTweetsData(newArray)
   });

  

// return querySnapshot;
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
}

export { signInPopUp,signOutUser,getUserAuth, addTweetFireBase,uploadImage,queryData, addUserFirebase};
