
import React,{useState,useEffect} from "react";
import { getUserData } from "./firebase";
import { useLocation } from "react-router";
const UserProfile = (props) => {
  // let data = useLocation();
  const {search} = props;
  const [user,setUser] = useState(undefined);
  const [loadingData, setLoadingData] = useState(false);
useEffect(()=>{

  if(!user)
getUserData(props.search,setLoadingData,setUser);


},[user,loadingData])


  if(!user){
    return(
      <main className="content">
      <div id={!loadingData? 'hidden': 'loader'}> </div>
      </main>
    )
  }
     
  return (
    <main className="content">
      <div className="topBar">
        <p>{user.displayName}</p>
      </div>
      <div className="userInfo">
        <img></img>
        <p>{user.displayName}</p>
        <p>@{user.user.substring(0,user.user.indexOf('@'))}</p>
      </div>
    </main>
  )
}

export default UserProfile; 