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
      if(user){
        setLogin(JSON.parse(user));
       
      }
  },[])


  useEffect(() => {
    
  },)

  return (
    <div className="App" >
        <Left login={login}></Left>
        <div className="leftholder"></div>
        <Middle login={login}></Middle>
      <div className="rightholder"></div>
        <Right  login={login} setLogin={setLogin}></Right>
    </div>
  );
}

export default App;
