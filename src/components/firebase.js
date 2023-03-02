import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { signOut } from "firebase/auth";
import { getStorage, ref,uploadBytesResumable,uploadBytes , getDownloadURL} from "firebase/storage";
import { getFirestore,doc, setDoc } from "firebase/firestore";



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

// Create a reference to 'mountains.jpg'
// const mountainsRef = ref(storage, img);

// Create a reference to 'images/mountains.jpg'
const storageRef = ref(storage, img.name);
const metadata = {
  contentType: 'image/jpeg',
  user: getAuth().currentUser.email,
};

const uploadTask = uploadBytesResumable(storageRef, img.file,metadata);

uploadTask.on('state_changed', 
  (snapshot) => {
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
await setDoc(doc(db, user.substring(0,user.indexOf('@')), "tweet"), {
  text: text,
  media: url,
  user: user.substring(0,user.indexOf('@')),
  date: date,
});
}


export { signInPopUp,signOutUser,getUserAuth, addTweetFireBase,uploadImage};
