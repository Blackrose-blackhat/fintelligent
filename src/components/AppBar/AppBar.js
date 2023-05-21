import * as React from "react";
import logo from "../../assets/images/logo.jpg";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LoginIcon from "@mui/icons-material/Login";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { LoginOutlined, Person3Rounded } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import "./AppBar.css";
import { auth } from "../../services/firebase.js";
import { useState } from "react";
import { signOut } from "firebase/auth";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Modal from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
window.onunload = () => {
  // Clear the local storage
  window.localStorage.clear();
};
export default function NavBar() {
  const user = auth.currentUser;

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  let navigate = useNavigate();
  const navtologin = () => {
    navigate("/Login");
  };
  const navtosignup = () => {
    navigate("Signup");
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/Login");
    });
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="medium" color="inherit" onClick={navtosignup}>
          <PersonAddAlt1Icon />
        </IconButton>
        <p>Signup</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="medium" color="white" onClick={navtologin}>
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#0A2A3C" }}>
        <Toolbar>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  variant="outlined"
                  style={{ color: "white" }}
                  {...bindTrigger(popupState)}
                >
                  <MenuIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>
                    {" "}
                    <HomeSharpIcon /> Home
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>
                    <GroupsSharpIcon />
                    About Us
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <div className="logo">
            <div className="logo-image">
              <img src={logo}></img>
            </div>
            <div className="logo-text">FINTELLIGENT</div>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          {!isAuth ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={navtosignup}
                size="large"
                color="white"
              >
                <PersonAddAlt1Icon
                  style={{ fontSize: "2rem", color: "white" }}
                />
                <p style={{ fontSize: "1rem", color: "white" }}>Signup</p>
              </IconButton>
              <IconButton size="medium" color="white" onClick={navtologin}>
                <LoginOutlined style={{ fontSize: "2rem", color: "white" }} />
                <p style={{ fontSize: "1rem", color: "white" }}>Login</p>
              </IconButton>
            </Box>
          ) : (
            <div className="profiler">
              <div onClick={handleOpen}>
                <Avatar
                  alt={user.displayName}
                  src={`${user.photoURL}`}
                  sx={{ width: 39, height: 39, cursor: "pointer" }}
                />
              </div>
              <StyledModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
              >
                <Box sx={style}>
                  <ProfilePage />
                </Box>
              </StyledModal>
            </div>
          )}
          {!isAuth ? (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="white"
              >
                <MoreIcon style={{ color: "white" }} />
              </IconButton>
            </Box>
          ) : (
            <Box></Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  position: "absolute",
  top: "52%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "87%",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: 24,
  padding: "16px 32px 24px 32px",
});
