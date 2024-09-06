import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/game_bg.png";
import backButtonIcon from "../../assets/back-button.png";

const Instructions = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        opacity: "0.8",
        height: "89vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Link
        to="/startgame"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          textDecoration: "none",
        }}
      >
        <img
          src={backButtonIcon}
          alt="Go Back"
          style={{
            width: "50px",
            cursor: "pointer",
          }}
        />
      </Link>

      {/* Instructions */}
    </div>
  );
};

export default Instructions;
