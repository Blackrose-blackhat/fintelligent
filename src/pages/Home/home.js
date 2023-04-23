import React from "react";
import "./home.css";
import NavBar from "../../components/AppBar/AppBar";
import { TypeAnimation } from "react-type-animation";
import { auth } from "../../services/firebase";
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
              "Stay Curious About Investement and Retirement Plans",
              1000,
            ]}
            speed={50}
            cursor={false}
            style={{ fontSize: "4rem", fontFamily: "serif", textAlign: "left" }}
            repeat={Infinity}
          />
          <h3>Some quotes here</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
