import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
const initialState = {
  firstName: "",
  LastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive }) => {
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

        setActive("home");
        toast.success("Account created succesfully!");
        navigate("/");
      } else {
        toast.error("All fields are mandatory!");
      }
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signup ? "Sign-In" : "Sign-Up"}
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
                  {!signup ? "Sign-In" : "Sign-Up"}
                </button>
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
                        Sign In
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
