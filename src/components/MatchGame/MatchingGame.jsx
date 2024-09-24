import React, { useState, useEffect, useRef } from "react";
import "./MatchingGame.css";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import backgroundMusic from "../../assets/background.mp3";

const allArticles = [
  {
    id: 1,
    article: "Article 52",
    institution: "Executive",
    title: "The President of India",
  },
  {
    id: 2,
    article: "Article 53",
    institution: "Executive",
    title: "Executive power of the Union",
  },
  {
    id: 3,
    article: "Article 61",
    institution: "Executive",
    title: "Procedure for Impeachment of the President",
  },
  {
    id: 4,
    article: "Article 74",
    institution: "Executive",
    title: "Council of Ministers to aid and advise the President",
  },
  {
    id: 5,
    article: "Article 79",
    institution: "Legislature",
    title: "Constitution of Parliament",
  },
  {
    id: 6,
    article: "Article 80",
    institution: "Legislature",
    title: "Composition of the Council of States",
  },
  {
    id: 7,
    article: "Article 124",
    institution: "Judiciary",
    title: "Establishment and constitution of Supreme Court",
  },
  {
    id: 8,
    article: "Article 125",
    institution: "Judiciary",
    title: "Salaries, etc., of Judges",
  },
  {
    id: 9,
    article: "Article 126",
    institution: "Judiciary",
    title: "Appointment of acting Chief Justice",
  },
  {
    id: 10,
    article: "Article 131",
    institution: "Judiciary",
    title: "Original jurisdiction of the Supreme Court",
  },
];

function MatchingGame() {
  const [currentArticles, setCurrentArticles] = useState([]);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [matched, setMatched] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const navigate = useNavigate();
  const [feedbackColor, setFeedbackColor] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const backgroundAudioRef = useRef(new Audio(backgroundMusic));

  useEffect(() => {
    loadNewQuestions();

    backgroundAudioRef.current.loop = true;
    backgroundAudioRef.current.volume = 0.5;
    backgroundAudioRef.current
      .play()
      .catch((error) => console.error("Audio play error:", error));

    return () => {
      backgroundAudioRef.current.pause();
    };
  }, []);

  const loadNewQuestions = () => {
    const shuffledArticles = shuffleArray([...allArticles]);
    const shuffledInstitutions = shuffleArray([
      "Executive",
      "Legislature",
      "Judiciary",
    ]);
    const shuffledTitles = shuffleArray(
      shuffledArticles.map((article) => article.title)
    );

    setCurrentArticles(shuffledArticles.slice(0, 5));
    setSelectedArticle(null);
    setSelectedInstitution(null);
    setSelectedTitle(null);
    setFeedback("");
    setFeedbackColor("");
    setMatched([]);
    setScore(0);
    setGameCompleted(false);

    const correctMatches = shuffledArticles.slice(0, 5).map((article) => ({
      id: article.id,
      institution: article.institution,
      title: article.title,
    }));

    setCorrectMatches(correctMatches);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setFeedback("");
  };

  const handleInstitutionClick = (institution) => {
    setSelectedInstitution(institution);
    setFeedback("");
  };

  const handleTitleClick = (title) => {
    setSelectedTitle(title);
    setFeedback("");
  };

  const checkMatch = () => {
    if (selectedArticle && selectedInstitution && selectedTitle) {
      const matchedArticle = correctMatches.find(
        (article) =>
          article.id === selectedArticle.id &&
          article.institution === selectedInstitution &&
          article.title === selectedTitle
      );

      if (matchedArticle) {
        setMatched((prevMatched) => [...prevMatched, matchedArticle.id]);
        setScore(score + 3);
        setFeedback("Correct match!✅");
        setFeedbackColor("green");
      } else {
        setScore(score - 1);
        setFeedback("Incorrect match. Try again.❌");
        setFeedbackColor("red");
      }

      setSelectedArticle(null);
      setSelectedInstitution(null);
      setSelectedTitle(null);
    } else {
      setFeedback("Please select all three fields.");
      setFeedbackColor("");
    }

    if (matched.length + 1 >= currentArticles.length) {
      navigate("/match-over", { state: { score } });
    }
  };

  const resetGame = () => {
    loadNewQuestions();
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (isMuted) {
      backgroundAudioRef.current.play();
    } else {
      backgroundAudioRef.current.pause();
    }
  };

  return (
    <div className="matching-game">
      <div className="mute-button2" onClick={toggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </div>

      <h2>Match Articles to Institutions and Titles</h2>
      <p className="paragraph">
        Match the articles from Part V & Part VI of the Constitution with their
        corresponding institutions and titles.
      </p>

      <div className="scoreboard">
        <FaTrophy className="trophy-icon" />
        <span className="score">{score}</span>
      </div>

      <div className="game-container">
        <div className="articles">
          <h3>Articles</h3>
          {currentArticles.map(
            (article) =>
              !matched.includes(article.id) && (
                <button
                  key={article.id}
                  className={`article-btn ${
                    selectedArticle === article ? "selected" : ""
                  }`}
                  onClick={() => handleArticleClick(article)}
                >
                  {article.article}
                </button>
              )
          )}
        </div>

        <div className="institutions">
          <h3>Institutions</h3>
          {["Executive", "Legislature", "Judiciary"].map((institution) => (
            <button
              key={institution}
              className={`institution-btn ${
                selectedInstitution === institution ? "selected" : ""
              }`}
              onClick={() => handleInstitutionClick(institution)}
            >
              {institution}
            </button>
          ))}
        </div>

        <div className="titles">
          <h3>Titles</h3>
          {currentArticles.map(
            (article) =>
              !matched.includes(article.id) && (
                <button
                  key={article.title}
                  className={`title-btn ${
                    selectedTitle === article.title ? "selected" : ""
                  }`}
                  onClick={() => handleTitleClick(article.title)}
                >
                  {article.title}
                </button>
              )
          )}
        </div>
      </div>

      <button className="check-btn" onClick={checkMatch}>
        Check Match
      </button>

      {feedback && (
        <p className="feedback" style={{ color: feedbackColor }}>
          {feedback}
        </p>
      )}
    </div>
  );
}

export default MatchingGame;