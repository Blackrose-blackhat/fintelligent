import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

function Login() {
  const click = () => {
    alert("Your email is " + email);
  };
  const [email, setEmail] = useState("");
  return (
    <form className="login-page">
      <div className="intro">
        <h1>
          Login to your fintelligent <br /> account
        </h1>
      </div>
      <div className="login-form">
        <div className="login-text">
          <text>Login</text>
          <h3> Sign in to Continue</h3>
        </div>

        <div className="Email">
          <TextField
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            id="filled-size-normal"
            style={{ width: 400 }}
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
            required
            type="password"
            label="Password"
            id="filled-size-normal"
            style={{ width: 400 }}
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

        <div className="Login">
          <Button
            variant="contained"
            type="submit"
            style={{ width: 400, height: 50, borderRadius: 15 }}
          >
            Login
          </Button>
        </div>
        <text className="text1">Forgot password?</text>

        <Button
          variant="contained"
          type="submit"
          style={{
            width: 400,
            height: 50,
            borderRadius: 15,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <GoogleIcon />
          Signin with google
        </Button>
        <text className="text1">
          Not having an account?
          <span className="signin">
            <Link to="/Signup">Sign Up </Link>
          </span>
        </text>
      </div>
    </form>
  );
}

export default Login;
