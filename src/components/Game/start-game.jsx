import React, { useState } from "react";
import { Link } from "react-router-dom";
import titleImage from "../../assets/game_title.png";
import infoIcon from "../../assets/info_icon.png";
import styles from "./GameComponent.module.css";

const Instructions = ({ onToggleReadAloud, isSpeaking }) => (
  <div className={styles.instructionBox}>
    <div className={styles.headerContainer}>
      <h3 className={styles.instructionsHeader}>
        Read the instructions carefully before
        <br />
        starting the game.
      </h3>
      <button onClick={onToggleReadAloud} className={styles.readAloudButton}>
        {isSpeaking ? "🔇" : "🔊"}
      </button>
    </div>
    <div className={styles.instructionsText}>
      <p>
        I. A question will appear on the screen. You will get 10 seconds to
        answer the question.
      </p>
      <p>
        II. If you answer the question correctly, you will get to roll the dice.
      </p>
      <p>
        III. If the answer is wrong, you can’t roll the dice and another
        question will be displayed on the screen.
      </p>
      <p>
        IV. The game will be over if you answer three consecutive questions
        incorrectly.
      </p>
    </div>
  </div>
);


const GameComponent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = React.useRef(null);

  const handleToggleInstructions = () => {
    setShowInstructions((prevState) => !prevState);
  };

  const handleToggleReadAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const instructionsText = `
        Listen to the instructions carefully before starting the game.
        First rule: A question will appear on the screen. You will get 10 seconds to answer the question.
        Second rule: If you answer the question correctly, you will get to roll the dice.
        Third rule: If the answer is wrong, you can’t roll the dice and another question will be displayed on the screen.
        Fourth rule: The game will be over if you answer three consecutive questions incorrectly.
        You are ready to gamify your learnings. Enjoy!
      `;

      utteranceRef.current = new SpeechSynthesisUtterance(instructionsText);
      utteranceRef.current.lang = "en-US";
      utteranceRef.current.onend = () => setIsSpeaking(false); // Reset state when speech ends
      window.speechSynthesis.speak(utteranceRef.current);
      setIsSpeaking(true);
    }
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
        <Instructions
          onToggleReadAloud={handleToggleReadAloud}
          isSpeaking={isSpeaking}
        />
      )}
    </div>
  );
};

export default GameComponent;
