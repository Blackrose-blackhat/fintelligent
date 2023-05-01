import React from "react";
import "./home.css";
import NavBar from "../../components/AppBar/AppBar";
import { TypeAnimation } from "react-type-animation";
import { auth } from "../../services/firebase";
import { CCard ,CCardImage,CCardBody,CButton,CCardText,CCardTitle} from "@coreui/react";
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
            style={{ fontSize: "3.3rem", fontFamily: "serif", textAlign: "left" }}
            repeat={Infinity}
          />
          <TypeAnimation
            sequence={[
              "“Successful investing is about managing risk, not avoiding it.” -Benjamin Graham",
              1000,
              "“The big money is not in the buying or selling, but in the waiting.” -Charlie Munger",
              1000,
              " “Rich people invest. Poor people spend.” -Grant Cardone",
              1000,
              "“Buy not on optimism, but on arithmetic.” -Benjamin Graham",
              1000,
              "“Price is what you pay, value is what you get.” -Warren Buffet",
              1000,
              "“Don’t be afraid to give up the good to go for the great.” -John D. Rockefeller",
              1000,
            ]}
            speed={65}
            cursor={false}
            style={{ fontSize: "1.2rem", fontFamily: "serif", textAlign: "left" }}
            repeat={Infinity}
          />
        </div>
      </div>
      <div className="card">
      <CCard style={{ width: '18rem' }}>
      <CCardImage orientation="top" />
      <CCardBody>
      <CCardTitle>Card title</CCardTitle>
      <CCardText>
      Some quick example text to build on the card title and make up the bulk of the card's content.
      </CCardText>
      <CButton href="#">Go somewhere</CButton>
      </CCardBody>
      </CCard>
      </div>
    </div>
  );
}

export default Home;
