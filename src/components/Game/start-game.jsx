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
              I. A question will appear on the
              screen. You will get 10 seconds to answer the question.
            </p>
            <p>
              II. If you answer the question
              correctly, you will get to roll the dice.
            </p>
            <p>
              III. If the answer is wrong, you can’t
              roll the dice and another question will be displayed on the
              screen.
            </p>
            <p>
              IV. Game will be over if you answer
              three consecutive questions incorrectly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameComponent;
