import { TextField, InputAdornment, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import React from "react";
import "./Signup.css";

function Signup() {
  const [errormsg, showErrorMsg] = useState("");

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    re_pass: "",
  });
  const Submission = () => {
    if (values.pass != values.re_pass) {
      showErrorMsg("Password doesn't match with re-enter password");
      return;
    } else {
      createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => alert(e));
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={Submission}>
        <div className="text1">
          <h1>Create new account</h1>
        </div>
        <div className="text2">
          <p>
            Already Registered ?{" "}
            <span className="login">
              <Link to="/Login">Login </Link>
            </span>
          </p>
        </div>
        <div className="Name">
          <TextField
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
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
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
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

        <div className="Password">
          <TextField
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
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
        <div className="Password">
          <TextField
            onChange={(event) =>
              setValues((prev) => ({ ...prev, re_pass: event.target.value }))
            }
            required
            type="password"
            label="Re-Enter Password"
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
        <div className="error-msg">
          <p>{errormsg}</p>
        </div>

        <div className="SignUpbtn">
          <Button
            onClick={Submission}
            variant="contained"
            style={{ width: 400, height: 50, borderRadius: 15 }}
          >
            Create Account
          </Button>
        </div>

        <Button
          variant="contained"
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
