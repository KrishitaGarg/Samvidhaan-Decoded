import React from "react";
import { Link } from "react-router-dom";
import "./Play.css";

const Play = () => {
  return (
    <section className="play">
      <div className="play-container">
        <h1>Select Game</h1>
        <div className="game-buttons">
          <Link to="/startgame" className="game-button">
            Snakes and Ladders
          </Link>
          <Link to="/start-trivia" className="game-button">
            Samvidhaan Encoded
          </Link>
          <Link to="/match-start" className="game-button">
            Samvidhaan Connect
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Play;
