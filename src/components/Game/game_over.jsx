import React, { useState } from "react";
import { Link } from "react-router-dom";
import titleImage from "../../assets/game_over.png";
import styles from "./game_over.css";

const GameOverComponent = () => {
  return (
    <div className={styles.container}>
      <img src={titleImage} alt="Game Over" className={styles.titleImage} />
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className={styles.homeButton}>
          Go back to <span>Home</span>
        </button>
      </Link>
    </div>
  );
};

export default GameOverComponent;
