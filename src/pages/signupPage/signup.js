import { TextField, InputAdornment, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

import React from "react";
import "./Signup.css";
const myFunc = () => {
  alert("Enter key pressed");
};
function Signup() {
  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={myFunc}>
        <div className="text1">
          <text>Create new account</text>
        </div>
        <div className="text2">
          <text>
            Already Registered ?{" "}
            <span className="login">
              <Link to="/Login">Login </Link>
            </span>
          </text>
        </div>
        <div className="Name">
          <TextField
            required
            type="text"
            label="Name"
            id="filled-size-normal"
            style={{ width: 500 }}
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
        <div className="Email">
          <TextField
            required
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            label="Email"
            id="filled-size-normal"
            style={{ width: 500 }}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="PhoneNumber">
          <TextField
            required
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            label="Phone Number"
            id="filled-size-normal"
            type="number"
            style={{ width: 500 }}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
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
            style={{ width: 500 }}
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
        <div className="SignUpbtn">
          <Button
            variant="contained"
            type="submit"
            style={{ width: 400, height: 50, borderRadius: 15 }}
          >
            Create Account
          </Button>
        </div>

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
      </form>
      <div className="image-logo"></div>
    </div>
  );
}

export default Signup;
