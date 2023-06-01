import React, { useState } from "react";
import { TextField, Button, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import "./Login.css";
import { user } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import logo from "../../assets/images/logo.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/images/google_logo.png";

import {
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";
import { app, db } from "../../services/firebase";
import ImageCarousel from "../../components/carousel/carousel";
function Login() {
  const auth = getAuth(app);
  const [errormsg, showErrorMsg] = useState("");

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  const click = async () => {
    await signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((userCredential) => {
        if (user != null) {
          console.log("login successfull");
          navigate("/");
        } else {
          showErrorMsg("Some internal error occured");
        }
      })
      .catch((error) => {
        //wrong password
        if (values.name == "" || values.pass == "") {
          setOpen(true);
          showErrorMsg("Please Fill in all Fields");
        } else if (error.code == "auth/wrong-password") {
          {
            setOpen(true);
            showErrorMsg("Invalid Password");
          }
        } else if (error.code == "auth/invalid-email") {
          setOpen(true);
          showErrorMsg("Invalid email");
        }
        //empty fields
      });
  };
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { isNewUser } = getAdditionalUserInfo(result);
        if (isNewUser) {
          window.sessionStorage.setItem("isAuth", false);
          setOpen(true);
          showErrorMsg("Account does not Exist !");

          user
            .delete()
            .then(() => {
              console.log("deleted");
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (!isNewUser) {
          if (user != null) {
            console.log("Login successfull");
            window.sessionStorage.setItem("isAuth", true);
            navigate("/");
          } else {
            navigate("/Login");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    await setDoc(doc(db, "users"), {});
  };
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  return (
    <div className="login-page">
      <div className="intro">
        <div className="animated-gif">
          <ImageCarousel />
        </div>
      </div>
      <div className="login-form">
        <div className="login-text">
          <div className="log">
            <Avatar
              alt="Remy Sharp"
              src={logo}
              style={{ zIndex: 2, marginLeft: 20 }}
              sx={{ width: 84, height: 84 }}
            />
            <text>Login</text>
          </div>
          <h3> Sign in to Continue</h3>
        </div>

        <div className="Email">
          <TextField
            style={{ width: 400 }}
            required
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            label="Email"
            id="filled-size-normal"
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
            style={{ width: 400 }}
            required
            type="password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            label="Password"
            id="filled-size-normal"
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
        <text className="text1"> or</text>

        <Button
          onClick={signInWithGoogle}
          variant="contained"
          style={{
            backgroundColor: "whitesmoke",
            color: "black",
            width: 400,
            height: 50,
            borderRadius: 15,
            gap: 10,
          }}
        >
          <img src={googleLogo} style={{ height: 30, width: 30 }} />
          Signin with google
        </Button>

        <text className="text1">
          Not having an account?
          <span className="signin">
            <Link to="/Signup">Sign Up </Link>
          </span>
        </text>
      </div>
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
    </div>
  );
}

export default Login;
