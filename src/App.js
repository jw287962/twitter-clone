import './App.css';
import React,{useState,useEffect} from 'react';
import Left from'./components/Left';
import Middle from'./components/Middle';
import Right from'./components/Right';


function App() {

  const [login,setLogin] = useState(null);
  return (
    <div className="App" >
        <Left login={login}></Left>
        <Middle login={login}></Middle>
        <Right  login={login} setLogin={setLogin}></Right>
    </div>
  );
}

export default App;
