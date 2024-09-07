import React, { useState } from "react";
import { Link } from "react-router-dom";
import titleImage from "../../assets/game_title.png";
import infoIcon from "../../assets/info_icon.png";
import styles from "./GameComponent.module.css";

const GameComponent = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleToggleInstructions = () => {
    setShowInstructions((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <img src={titleImage} alt="Game Title" className={styles.titleImage} />

      <Link to="/game" style={{ textDecoration: "none" }}>
        <button className={styles.startButton}>
          Start <span>Game</span>
        </button>
      </Link>

      <button
        onClick={handleToggleInstructions}
        className={styles.instructionButton}
      >
        Read <span style={{ marginLeft: "5px" }}>Instructions</span>
        <img src={infoIcon} alt="Info Icon" className={styles.infoIcon} />
      </button>

      {showInstructions && (
        <div className={styles.instructionBox}>
          <h3 className={styles.instructionsHeader}>
            Read the instructions carefully before starting the game
          </h3>

          <div className={styles.instructionsText}>
            <p>
              <span>I.</span> If the player reaches a ladder or a snake, a
              question will appear on the screen.
            </p>
            <p>
              <span>II.</span> In case you reach a ladder:
            </p>
            <p style={{ fontSize: "19px" }}>
              <span>a)</span> If you answer correctly, you can climb the ladder.
              <br />
              <span>b)</span> Otherwise, you can’t go up.
            </p>
            <p>
              <span>III.</span> In case you reach a snake:
            </p>
            <p style={{ fontSize: "19px" }}>
              <span>a)</span> If you answer correctly, you will not slither down
              the snake.
              <br />
              <span>b)</span> Otherwise, you will go down the snake.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameComponent;
