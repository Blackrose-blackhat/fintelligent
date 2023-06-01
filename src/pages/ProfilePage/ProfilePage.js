import React from "react";
import "../ProfilePage/ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { auth, user } from "../../services/firebase";
import logo from "../../assets/images/logo.jpg";
import { getAuth, signOut } from "firebase/auth";
import TextField from "@mui/material/TextField";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  BookmarkBorder,
  CallOutlined,
  EmailOutlined,
  LogoutOutlined,
  PhoneAndroid,
  Settings,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
function ProfilePage() {
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      window.sessionStorage.clear();
      navigate("/Login");
    });
  };
  return (
    <div className="Profile">
      <div className="header">
        <div className="logo-text">FINTELLIGENT</div>
        <div className="logo-img">
          <img src={logo} style={{ width: 90, borderRadius: 50 }}></img>
        </div>
      </div>
      <div className="details">
        <div className="profile-links">
          <Avatar
            alt={user.displayName}
            src={`${user.photoURL}`}
            sx={{
              width: 219,
              height: 219,
              cursor: "pointer",
              borderRadius: "50%",
              border: "3px solid #cccccc",
            }}
          />
          <IconButton
            size="large"
            color="black"
            style={{ marginBottom: 50, fontSize: 22 }}
          >
            <EditIcon style={{ color: "black" }} />
            Edit
          </IconButton>

          <IconButton size="large" color="black">
            <Settings style={{ color: "black" }} />
            Settings
          </IconButton>
          <IconButton size="large" color="black">
            <BookmarkBorder style={{ color: "black" }} />
            Bookmarks
          </IconButton>
          <IconButton onClick={signUserOut} size="large" color="black">
            <LogoutOutlined style={{ color: "black" }} />
            Log Out
          </IconButton>
        </div>
        <div className="details-text">
          <div className="user-name">
            <p>{user.displayName}</p>
          </div>
          <div className="user-details">
            <TextField
              style={{ width: 400 }}
              id="input-with-icon-textfield"
              label="TextField"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CallOutlined />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              style={{ width: 400 }}
              id="input-with-icon-textfield"
              label="Email"
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
