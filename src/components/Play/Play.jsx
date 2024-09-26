import React from "react";
import { Link } from "react-router-dom";
import "./Play.css";
import title from "../../assets/play-title.png"; // Ensure this path is correct
import btn1 from "../../assets/btn1.png"; // Import image for Snakes and Ladders
import btn2 from "../../assets/btn2.png"; // Import image for Samvidhaan Encoded
import btn3 from "../../assets/btn3.png"; // Import image for Samvidhaan Connect

const Play = () => {
  return (
    <section className="play">
      <div className="play-container">
        <img src={title} alt="Game Title Image" />

        <div className="game-buttons">
          <Link to="/startgame" className="game-button">
            <img src={btn1} alt="Snakes and Ladders" />
          </Link>
          <Link to="/start-trivia" className="game-button">
            <img src={btn2} alt="Samvidhaan Encoded" />
          </Link>
          <Link to="/match-start" className="game-button">
            <img src={btn3} alt="Samvidhaan Connect" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Play;
