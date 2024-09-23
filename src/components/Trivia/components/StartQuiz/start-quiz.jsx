import React, { useState } from "react";
import { Link } from "react-router-dom";
import titleImage from "../../../../assets/trivia-title.png";
import infoIcon from "../../../../assets/info_icon.png";
import styles from "./TriviaComponent.module.css";

const Instructions = ({ onToggleReadAloud, isSpeaking }) => (
  <div className={styles.instructionBox}>
    <div className={styles.headerContainer}>
      <h3 className={styles.instructionsHeader}>
        Test your knowledge of the Constitution with this fun and informative
        quiz!
        <br />
      </h3>
      <button onClick={onToggleReadAloud} className={styles.readAloudButton}>
        {isSpeaking ? "🔇" : "🔊"}
      </button>
    </div>
    <div className={styles.instructionsText}>
      <p>
        I. Select your quiz settings: choose the category, number of questions,
        difficulty level, question type, and total time to play the quiz.
      </p>
      <p>
        II. One question will appear on the screen at a time, and you will have
        the specified time to answer it. You cannot move ahead until you answer
        the question.
      </p>
      <p>
        III. The quiz ends when you've completed all questions or when the time
        is over.
      </p>
      <p>
        IV. After finishing, review your performance, including your total score
        and the correct answers for learning.
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
        Listen to the instructions carefully before starting the quiz.
        First rule: Select your quiz settings: choose the category, number of questions, difficulty level, question type, and total time to play the quiz.
        Second rule: One question will appear on the screen at a time, and you will have the chosen time to answer it. You cannot move ahead until you answer the question.
        Third rule: The quiz ends when you've completed all questions or when the time is over.
        Finally, review your performance, including your total score and the correct answers.
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
      <img src={titleImage} alt="Trivia Title" className={styles.titleImage} />

      <Link to="/trivia-app" style={{ textDecoration: "none" }}>
        <button className={styles.startButton}>
          Start <span>Quiz</span>
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
