import React from "react";
import "../ProfilePage/ProfilePage.css";
import logo from "../../assets/images/logo.jpg";
import { getAuth, signOut } from "firebase/auth";
function ProfilePage() {
  const logout = () => {
    //signout function
  };
  return (
    <div className="Profile">
      <div className="header">
        <div className="logo-text">FINTELLIGENT</div>
        <div className="logo-img">
          <img src={logo} style={{ width: 90 }}></img>
        </div>
        <div onClick={logout} className="sign-out">
          logout
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
