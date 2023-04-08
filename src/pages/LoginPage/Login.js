import React from "react";
import { TextField } from "@mui/material";
import "./Login.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
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
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
