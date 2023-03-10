import './App.css';
import React,{useState,useEffect} from 'react';
import Left from'./components/Left';
import Middle from'./components/Middle';
import Right from'./components/Right';
import { signInPopUp,getUserAuth,addUserFirebase } from './components/firebase';
const process_env = process.env;


console.log(process_env)

function App() {

  const [login,setLogin] = useState(null);

  useEffect(() => {
    
    const user = localStorage.getItem('user');
      if(user){
        setLogin(JSON.parse(user));
       
      }
  },[])


  useEffect(() => {
    
  },)
  async function signInUser(){
    if(login == null){
      const signedIn = signInPopUp()
      signedIn.then(()=>  {
          setLogin(getUserAuth().currentUser) 
          localStorage.setItem('user',JSON.stringify(getUserAuth().currentUser));
          addUserFirebase();
    
        });
    }
 }
  return (
    <div className="App" >
        <Left login={login} setLogin={setLogin} signInUser={signInUser}></Left>
        <Middle login={login} signInUser={signInUser}></Middle>
        <Right  login={login} setLogin={setLogin}></Right>
    </div>
  );
}

export default App;
