import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import logo1 from "../../assets/images/money.jpg";
import logo2 from "../../assets/images/logo3.png";
export default function ImageCarousel() {
  return (
    <div style={{ display: "block", width: "100%", height: "100%" }}>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={logo1} alt="Image One" />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>Sample Text for Image One</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={logo2} alt="Image Two" />
          <Carousel.Caption>
            <h3>Label for second slide</h3>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
