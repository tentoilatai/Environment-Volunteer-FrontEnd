import React from "react";
import "./Welcome.scss";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";


const Welcome = () => {
  const navigate = useNavigate();
  const handleOnPress = () => {
    return alert("success!");
  };
  return (
    <div className="Welcome-container">
      <h1 className="title">Welcome !</h1>
      <p className="description">
      Welcome back, start your work with one of the options below.
      </p>
      <div className="btn-container">

        <Button className="nav-btn" onClick={()=>{navigate("/list-account")}} label="List account"></Button>
        <Button className="nav-btn" onClick={()=>{navigate("/my-project")}} label="My project"></Button>
        <Button className="nav-btn" onClick={()=>{navigate("/list-project")}} label="List project"></Button>
        <Button  className="nav-btn" onClick={()=>{navigate("/list-campaign")}} label="List campaign"></Button>
        <Button  className="nav-btn" onClick={()=>{navigate("/statistic")}} label="Statistic"></Button>
      </div>
      <div className="Img"></div>
      
    </div>
  );
};

export default Welcome;
