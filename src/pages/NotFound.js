import React from "react";
import "../style.scss";
// Import the CSS file for styling
import image from "../assets/images/notFound.jpg";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      {image && (
        <img
          src={image}
          alt="Not Found"
          className="not-found-image"
          style={{ height: 600 }}
        />
      )}
      <p className="not-found-message">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
