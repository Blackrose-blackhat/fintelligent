import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "./assets/cyber.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebase";
function Login() {
  const auth = getAuth(app);
  let navigate = useNavigate();
  const click = async () => {
    await signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("login successfull");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  return (
    <div className="login-page">
      <div className="intro">
        <div className="intro-text">
          <h1>
            Login to your fintelligent <br /> account
          </h1>
        </div>
        <div className="animated-gif">
          <img src={logo} alt="animated"></img>
        </div>
      </div>
      <div className="login-form">
        <div className="login-text">
          <text>Login</text>
          <h3> Sign in to Continue</h3>
        </div>

        <div className="Email">
          <TextField
            required
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
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
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
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
            onClick={click}
            variant="contained"
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
    </div>
  );
}

export default Login;
