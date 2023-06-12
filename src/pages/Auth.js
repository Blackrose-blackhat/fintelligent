import React, { useState } from "react";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import "firebase/firestore";
import { db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
const initialState = {
  firstName: "",
  LastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive, setUser }) => {
  // const firestore = firebase.firestore();
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [signup, setSignup] = useState(false);

  const { email, password, firstName, LastName, confirmPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!signup) {
      if (email && password) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setActive("home");
          toast.success("Login succesfull! 😀");
          navigate("/");
        } catch (error) {
          if ((error.code = "400")) {
            toast.error("Wrong Password! 😤");
          }

          navigate("/auth");
        }
      } else {
        toast.error("Please enter email and password 😒");
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Password does'nt match 🧐");
      }
      if (firstName && LastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(user, { displayName: `${firstName} ${LastName}` });
        await setDoc(doc(db, "users", user.uid), {
          firstName: firstName,
          LastName: LastName,
          email: email,
          password: password,
        });
        setActive("home");

        toast.success("Account created succesfully!");
        navigate("/");
      } else {
        toast.error("All fields are mandatory!");
      }
    }
  };

  const googleAuthLogin = async () => {
    const { user } = await signInWithPopup(auth, provider).then((res) => {
      const { isNewUser } = getAdditionalUserInfo(res);
      if (!isNewUser) {
        navigate("/");
        toast.success("Login succesfull");
        window.location.reload(false);
        setActive("home");
        setUser(user);
      } else {
        const curr_user = auth.currentUser;
        curr_user
          .delete()
          .then(async () => {
            ("deleted");
            toast.error("Account does not exist");
            await setUser(null);
          })
          .catch((e) => {});
      }
    });
  };
  const googleAuthSignUp = async () => {
    const { user } = await signInWithPopup(auth, provider)
      .then((res) => {
        const { isNewUser } = getAdditionalUserInfo(res);
        if (!isNewUser) {
          toast.error("User already registered login to continue!");
          setUser(null);
          navigate("/auth");
        } else {
          // updateProfile(user, { displayName: `${firstName} ${LastName}` });
          navigate("/");
          toast.success("Account created succesfully!");
          setActive("home");
          setUser(user);
        }
      })
      .catch((e) => {});
  };

  return (
    <div
      className="container-fluid mb-4"
      style={{
        marginTop: 90,
      }}
    >
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signup ? "Login" : "Sign-Up"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              {signup && (
                <>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="Last Name"
                      name="LastName"
                      value={LastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {signup && (
                <>
                  <div className="col-12 py-3">
                    <input
                      type="password"
                      className="form-control input-text-box"
                      placeholder="confirm-password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="col-12 py-3 text-center">
                <button
                  className={`btn ${!signup ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit"
                >
                  {!signup ? "LogIn" : "Sign-Up"}
                </button>
              </div>
              <div
                className="col-12 py-3 text-center"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GoogleButton
                  type="dark"
                  label={`${
                    !signup ? "Login with google" : "Sign-up with google"
                  }`}
                  onClick={() => {
                    if (!signup) {
                      googleAuthLogin();
                    } else {
                      googleAuthSignUp();
                    }
                  }}
                />
              </div>
            </form>
            <div>
              {!signup ? (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account ?&nbsp;
                      <span
                        className="link-danger"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() => setSignup(true)}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account ? &nbsp;
                      <span
                        className="link-danger"
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "#298af2",
                        }}
                        onClick={() => setSignup(false)}
                      >
                        Log In
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
