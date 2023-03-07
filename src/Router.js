import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./components/Profile";

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
       
      </Routes>
    </BrowserRouter>
  );

}
export default Router;
