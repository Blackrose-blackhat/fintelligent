import React from "react";
import "./home.css";
import NavBar from "../../components/AppBar/AppBar";
import { TypeAnimation } from "react-type-animation";
import { auth } from "../../services/firebase";
import {
  CCard,
  CCardImage,
  CCardBody,
  CButton,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import BlogCards from "../../components/blogCards/Cards";
function Home() {
  const user = auth.currentUser;
  return (
    <div className="home">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="home-bg">
        <div className="bg-text">
          <TypeAnimation
            sequence={[
              "Stay Curious About Fianance",
              1000,
              "Stay Curious About Insaurance",
              1000,
              "Stay Curious About Credit Cards",
              1000,
              "Stay Curious About Domestic Market News",
              1000,
              "Stay Curious About Global Market News",
              1000,
              "Stay Curious About Investement & Retirement Plans",
              1000,
            ]}
            speed={50}
            cursor={false}
            style={{
              fontSize: "4rem",
              fontFamily: "serif",
              textAlign: "left",
            }}
            repeat={Infinity}
          />
          <h2> Price is what you pay, value is what you get. -Warren Buffet</h2>
        </div>
      </div>
      <div className="card">
        <BlogCards />
      </div>
    </div>
  );
}

export default Home;
