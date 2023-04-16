import { TextField, InputAdornment, Button, Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import logo from "./../../assets/images/logo.jpg";
import googleLogo from "./../../assets/images/google_logo.png";
import ImageCarousel from "../../components/carousel/carousel";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../../services/firebase.js";
import { db } from "../../services/firebase.js";
import {
  Avatar,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import React from "react";
import "./Signup.css";
import { addDoc, collection } from "firebase/firestore";

function Signup() {
  const [errormsg, showErrorMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };
  const [isAuth, setIsAuth] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    re_pass: "",
  });
  const Submission = async () => {
    if (values.pass != values.re_pass) {
      setOpen(true);
      showErrorMsg("Password doesn't match with re-enter password");
      return;
    } else {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          username: values.name,
          password: values.pass,
          email: values.email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.log(e);
      }
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.pass,
        values.name
      )
        .then((res) => {
          console.log(res);
          setOpen(true);
          showErrorMsg("Account created sucessfull!");
        })
        .catch((e) => {
          console.log(e);
          if (
            values.name == "" ||
            values.email == "" ||
            values.pass == "" ||
            values.re_pass == ""
          ) {
            setOpen(true);
            showErrorMsg("Please fill in all Fields !");
          } else if (e.code == "auth/email-already-in-use") {
            setOpen(true);
            showErrorMsg("Email Already in Use!");
          } else if (e.code == "auth/weak-password") {
            setOpen(true);
            showErrorMsg("Password should be at least 6 characters  ");
          } else if (e.code == "auth/invalid-email") {
            setOpen(true);
            showErrorMsg("Please enter a valid email address");
          }
        });
    }
  };
  const signInWithGoogle = (setAuth) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        localStorage.setItem("isAuth", true);
        setAuth(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-page">
      <form
        className="signup-form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <Avatar
          alt="Fintelligent"
          src={logo}
          style={{ zIndex: 2, marginLeft: 20 }}
          sx={{ width: 84, height: 84, marginTop: 3 }}
        />
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
        <div className="Email">
          <TextField
            required
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            label="Email"
            id="filled-size-normal"
            style={{
              width: 400,
            }}
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
            style={{
              width: 400,

              textAlign: "center",
            }}
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
          onClick={signInWithGoogle}
          variant="contained"
          style={{
            boxShadow: "20px ",
            backgroundColor: "whitesmoke",
            color: "black",
            width: 400,
            height: 70,
            borderRadius: 15,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <img src={googleLogo} style={{ height: 30, width: 30 }} />
          Signin with google
        </Button>
        <Dialog
          style={{ borderRadius: "2vw" }}
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{errormsg}</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <div className="carousel">
        <ImageCarousel />
      </div>
    </div>
  );
}

export default Signup;
