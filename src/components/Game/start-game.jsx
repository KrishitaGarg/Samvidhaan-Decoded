import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/game_bg.png";
import titleImage from "../../assets/game_title.png";

const GameComponent = () => {

  const [gameState, setGameState] = useState({
    gameStauts: "start",
    gameTimer: 60,
    score: 0,
    currentPos: 0,
    currentQuestion: 0
  });

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
      }}
    >
      <img
        src={titleImage}
        alt="Game Title"
        style={{ width: "25%", marginBottom: "20px" }}
      />

      <Link to="/game" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            margin: "10px",
            cursor: "pointer",
            background: "transparent",
            border: "2px solid blue",
            color: "white",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Start <span>Game</span>
        </button>
      </Link>

      <Link to="/instructions" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            margin: "10px",
            cursor: "pointer",
            background: "transparent",
            border: "2px solid blue",
            color: "white",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Read <span>Instructions</span>
        </button>
      </Link>
    </div>
  );
};

export default GameComponent;
