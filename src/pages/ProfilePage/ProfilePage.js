import React from "react";
import "../ProfilePage/ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import logo from "../../assets/images/logo.jpg";
import { getAuth, signOut } from "firebase/auth";
function ProfilePage() {
  const user = auth.currentUser;
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/Login");
    });
  };
  return (
    <div className="Profile">
      <div className="header">
        <div className="logo-text">FINTELLIGENT</div>
        <div className="logo-img">
          <img src={logo} style={{ width: 90 }}></img>
        </div>
        <div onClick={signUserOut} className="sign-out">
          logout
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
