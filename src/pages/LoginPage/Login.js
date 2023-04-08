import React from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
const inputProps = {
  step: 30,
};
function Login() {
  return (
    <div className="login-page">
      <div className="intro">
        <h1>Login to your fintelligent account</h1>
      </div>
      <div className="login-form">
        <div className="login-text">
          <text>Login</text>
          <h3> Sign in to Continue</h3>
        </div>
        <div className="Email">
          <TextField
            label="Email"
            id="filled-size-normal"
            style={{ width: 600 }}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="Password">
          <TextField
            label="Password"
            id="filled-size-normal"
            style={{ width: 600 }}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <button id="loginbtn" type="submit">
          Login
        </button>
        <text className="text1">Forgot password?</text>
        <text className="text1">or</text>

        <button id="googlebtn" type="submit">
          <GoogleIcon />
          <text>Sign In with Google</text>
        </button>
        <text className="text1">
          Not having an account?{" "}
          <span className="signin">
            <Link to="/singup">Sign Up </Link>
          </span>
        </text>
      </div>
    </div>
  );
}

export default Login;
