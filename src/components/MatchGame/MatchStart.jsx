import React, { useState } from "react";
import { Link } from "react-router-dom";
import titleImage from "../../assets/match-title.png";
import infoIcon from "../../assets/info_icon.png";
import styles from "./MatchStart.module.css";

const Instructions = ({ onToggleReadAloud, isSpeaking }) => (
  <div className={styles.instructionBox}>
    <div className={styles.headerContainer}>
      <h3 className={styles.instructionsHeader}>
        Test Your Knowledge of the Constitution of India! Match Articles with
        Their Corresponding Institutions and Titles.
      </h3>
      <button onClick={onToggleReadAloud} className={styles.readAloudButton}>
        {isSpeaking ? "🔇" : "🔊"}
      </button>
    </div>
    <div className={styles.instructionsText}>
      <p>
        I. A list of articles will be displayed. Click on an article to select
        it. The selected article will be highlighted. Next, choose the
        institution associated with the selected article by clicking on one of
        the options. Finally, select the correct title for the article by
        clicking on it from the list of titles provided.
      </p>
      <p>
        II. Now, click the "Check Match" button to see if you've made the
        correct match. If correct, you'll earn 3 points; if incorrect, you'll
        lose 1 point.
      </p>
      <p>
        III. The game ends when all articles have been correctly matched with
        their respective institutions and titles.
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
First rule: A list of articles will be displayed. Click on an article to select it. The selected article will be highlighted. Next, choose the institution associated with the selected article by clicking on one of the options. Finally, select the correct title for the article by clicking on it from the list of titles provided.
Second rule: Now, click the "Check Match" button to see if you've made the correct match. If correct, you'll earn 3 points; if incorrect, you'll lose 1 point.
Third rule: The game ends when all articles have been correctly matched with their respective institutions and titles.
Note: Your live score is shown at the top. Think carefully before selecting, as incorrect matches will reduce your score.
You are ready to gamify your learnings. Enjoy!
      `;

      utteranceRef.current = new SpeechSynthesisUtterance(instructionsText);
      utteranceRef.current.lang = "en-US";
      utteranceRef.current.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utteranceRef.current);
      setIsSpeaking(true);
    }
  };

  return (
    <div className={styles.container}>
      <img src={titleImage} alt="Game Title" className={styles.titleImage} />

      <Link to="/matching-game" style={{ textDecoration: "none" }}>
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
