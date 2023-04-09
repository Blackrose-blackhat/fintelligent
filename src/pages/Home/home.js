import { Button } from "@mui/material";
import React from "react";
import "./home.css";
import { Navigate, Link, useNavigate } from "react-router-dom";
function Home() {
  let navigate = useNavigate();
  const click = () => {
    navigate("/Login");
  };
  const click2 = () => {
    navigate("Signup");
  };

  return (
    <div className="home">
      <Button variant="contained" onClick={click}>
        Login
      </Button>
      <Button variant="contained" onClick={click2}>
        Signup
      </Button>
    </div>
  );
}

export default Home;
