import React from "react";
import "./home.css";
import NavBar from "../../components/AppBar/AppBar";
import { TypeAnimation } from "react-type-animation";
import { auth } from "../../services/firebase";
import { Card, Grid, Text, Link } from "@nextui-org/react";
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
      <div>
      <Card css={{ p: "$6", mw: "400px" }}>
      <Card.Header>
        <Grid.Container css={{ pl: "$2" }}>
          <Grid xs={8}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              Article Title
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}></Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
          Blog Text Here
        </Text>
      </Card.Body>
      <Card.Footer>
        <Link
          icon
          color="primary"
          target="_blank"
          href="https://github.com/nextui-org/nextui"
        >
          Read More
        </Link>
      </Card.Footer>
    </Card>
      </div>
    </div>
  );
}

export default Home;
