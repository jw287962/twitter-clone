
import React,{useState,useEffect} from "react";
import { useLocation } from "react-router";


const ImportLogin = (Component,props) => {
  let data = useLocation();
  const {login,search} = data.state;

  return(

    <Component login={data.state.login} {...props}></Component>
  )
}

export default ImportLogin; 