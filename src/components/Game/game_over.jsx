import React, { useState } from "react";
import { Link } from "react-router-dom";
import gameOverImage from "../../assets/game_over.png";
import "./game_over.css"
const GameOverComponent = ({ score }) => {
  return (
    <section className="game-over">
      <img src={gameOverImage} alt="Game Over" className="gameOverImage" />
      <div className="game-over-text">
        <h1>Game Over! Your Score is {score}</h1>
      </div>
      <Link to="/startgame" style={{ textDecoration: "none" }}>
        <button className="playAgainButton">
          Play <span>Again</span>
        </button>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="homeButton">
          Go back to <span>Home</span>
        </button>
      </Link>
    </section>
  );
};

export default GameOverComponent;
