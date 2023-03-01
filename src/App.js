import './App.css';
import React,{useState,useEffect} from 'react';
import Left from'./components/Left';
import Middle from'./components/Middle';
import Right from'./components/Right';
const process_env = process.env;


console.log(process_env)

function App() {

  const [login,setLogin] = useState(null);

  useEffect(() => {
    
    const user = localStorage.getItem('user');
    console.log(user);
      if(user){
        setLogin(JSON.parse(user));
       
      }
  },[])


  useEffect(() => {
    
  },)

  return (
    <div className="App" >
        <Left login={login}></Left>
        <Middle login={login}></Middle>
        <Right  login={login} setLogin={setLogin}></Right>
    </div>
  );
}

export default App;
