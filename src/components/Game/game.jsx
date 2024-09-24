import React, { useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { MdReplay } from "react-icons/md";
import useWindowSize from "react-use/lib/useWindowSize";
import gameBoardImg from "../../assets/game-board.png";
import { useAuth } from "../AuthContex";
import { questions as defaultQuestion } from "./constnat";
import "./game.css";
import api from "./api";
import {
  CountdownCircleTimer,
  useCountdown,
} from "react-countdown-circle-timer";
import { BsHourglassSplit } from "react-icons/bs";

import Dice from "react-dice-roll-update";
import GameOverComponent from "./game_over";

const ladderPositions = [
  { from: 6, to: 47 },
  { from: 20, to: 41 },
  { from: 37, to: 56 },
  { from: 61, to: 80 },
  { from: 66, to: 96 },
  { from: 71, to: 92 },
];

const snakePositions = [
  { from: 98, to: 46 },
  { from: 72, to: 54 },
  { from: 62, to: 43 },
  { from: 51, to: 13 },
  { from: 39, to: 18 },
  { from: 25, to: 4 },
];

const timmweValue = 10;

export default function Game() {
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);
  const [currentPos, setCurrentPos] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [boardIndex, setBoardIndex] = useState(0);
  const [timmerKey, setTimmerKey] = useState(0);
  const [message, setMessage] = useState("Start the game");
  const [nextQuestion, setNextQuestion] = useState();
  const [loading, setLoading] = useState(true);
  const [timmerMaxTime, setTimmerMaxTime] = useState(10);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const[ slelectedOption, setSelectedOption] = useState(null);  

  useEffect(() => {
    setCorrectAnswer(null);
    setSelectedOption(null);
  }, [currentQuestion]);

  // API Working
  const [gameID, setGameID] = useState("");

  const { currentUser } = useAuth();

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (gameState !== "run" && gameState !== "diceRolling") return;
    setTimmerMaxTime(10);
    setTimmerKey((prev) => prev + 1);
  }, [gameState, currentQuestion]);

  const handelAnswer = async (answer, skipAnswer) => {
    setSelectedOption(answer);
    setLoading(true);
    if(gameID === "") return;
    if(gameState === "end") return;
    if (gameState !== "run" && gameState !== "pelenity" && gameState !== "diceRolling") return;
    try {
      const response = await api.post(`/game/${gameID}/check-answer/`, {
        question_id: currentQuestion.question_id,
        selected_option: answer,
      });
      const data = response.data;
      console.log(data);
      setCorrectAnswer(data.correct_answer_code);
      setNextQuestion(data.next_question);

      setLoading(false);

      if (skipAnswer) {
        setCurrentQuestion(data.next_question);
        setNextQuestion(null);
        setMessage("Answer the Question");
        setGameState("run");
        return null;
      }

      if (data.status === "correct") {
        setScore(score + 1);
        setTimmerKey((prev) => prev + 1);
        setMessage("Correct Answer, Now Roll the Dice");
        setGameState("diceRolling");
        return;
      } else {
        setMessage("Wrong Answer, Next Question");
        let value = 5;
        setTimmerMaxTime(5);
        setTimmerKey((prev) => prev + 1);
        setGameState("pelenity");
        const interval = setInterval(() => {
          value--;
          if (value <= 0) {
            setMessage("Answer the Question");
            clearInterval(interval);
            setCurrentQuestion(data.next_question);
            setNextQuestion(null);
            setGameState("run");
            return;
          }
          setMessage("Wrong Answer, Next Question coming in " + value);
        }, 1000);
        return;
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  useEffect(() => {
    const startGame = async () => {
      try {
        setLoading(true);
        const response = await api.post("/game/start-game/");
        const data = response.data;
        setGameID(data.game_id);
        setCurrentQuestion(data.current_question);
        setLoading(false);
      } catch (error) {
        console.error("Error starting game:", error);
      }
    };

    startGame();
  }, []);


  

  useEffect(() => {
    let value = 4;
    const interval = setInterval(() => {
      value--;
      if (value <= 0) {
        setMessage("Game Started, Answer the question");
        setGameState("run");
        clearInterval(interval);
        return;
      }
      if (value <= 0) {
        setMessage("Loading Questions...");
        return;
      }

      setMessage("Game Starting in " + value);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const indexAtBoard = (100 - currentPos) % 10;
    const row = Math.floor((100 - currentPos) / 10);
    let index = 0;
    if (row % 2 === 0) {
      index = row * 10 + indexAtBoard;
    } else {
      index = row * 10 + 9 - indexAtBoard;
    }
    setBoardIndex(index);
  }, [currentPos]);

  useEffect(() => {
    setTimmerKey((prev) => prev + 1);
    if (currentPos >= 100) {
      setGameState("end");
      setCurrentPos(100);
      return;
    }
    const ladder = ladderPositions.find((ladder) => ladder.from === currentPos);
    if (ladder) {
      setMessage("You got a ladder, Move to " + ladder.to);
      setCurrentPos(ladder.to);
    } else {
      const snake = snakePositions.find((snake) => snake.from === currentPos);
      if (snake) {
        setMessage("You got a snake, Move to " + snake.to);
        setCurrentPos(snake.to);
      }
    }

    updateScore(1);
    return;
  }, [currentPos]);

    // Handeling Page Close 

    useEffect(() => {
      window.addEventListener("beforeunload", handelGameEnd);
      return () => {
        window.removeEventListener("beforeunload", handelGameEnd);
      };
    }, []);

  const updateScore = async (score_update) => {
    try {
      const response = await api.post(`/game/${gameID}/update-game/`, {
        current_position: String(currentPos),
        point_update: score_update,
        wait_status: gameState === "run" ? "1" : "0",
      });
      const data = response.data;
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handelGameEnd = async () => {
    try {
      const response = await api.delete(`/game/${gameID}/close-game/`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error ending game:", error);
    }
  };

  useEffect(() => {
    if (gameState === "end" || currentPos >= 100) {
      handelGameEnd();
    }
  }, [gameState, currentPos]);


  const handelDiceRoll = (value) => {
    if(gameState === "end") return;
    if (gameState !== "diceRolling") return;
    setIsMoving(true);
    setMessage("Dice Rolled, Move " + value + " steps");
    setTimeout(() => {
      setIsMoving(false);
      setCurrentPos(Math.min(100, currentPos + value));
      console.log("Current Pos", nextQuestion);
      setCurrentQuestion(nextQuestion);
      setGameState("run");
    }, 1000);
  };

  const handelTimeOut = () => {
    if(gameState === "end") return;
    if (gameState !== "run" && gameState !== "diceRolling" && gameState !== "pelenity") return;
    if(nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setNextQuestion(null);
    }else {
      handelAnswer("O", true);
    }
    setMessage("Time Out, Next Question");
    setGameState("run");
  };


  const { remainingTime } = useCountdown({
    isPlaying: gameState === "run" || gameState === "diceRolling",

    duration: 300,
    colors: "#abc",
    onComplete: () => {
      setGameState("end");

    },
  });

  if(currentPos >= 100 || gameState === "end") {
    return (
      <section className="game-over">
        <Confetti width={width * 0.98} height={height * 0.98} />
        <GameOverComponent score={score} escapeTime={remainingTime} />
      </section>
    )
  }



  return (
    <div
      style={{
        minHeight: "89vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "1px",
      }}
    >
      {(gameState === "end" || currentPos >= 100) && (
        <Confetti width={width * 0.98} height={height * 0.98} />
      )}
      
      <div className="game-container-run">
        <header className="game-header-run">
          <div className="game-header-run-user">
            <img
              src={
                currentUser
                  ? currentUser.photoURL
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="User"
              className="game-header-run-user-img"
            />
            <span>Hi, {currentUser ? currentUser.displayName : "User"}</span>
          </div>
          <div className="game-header-run-score">
            <div className="game-header-run-score-item">
              <svg
                width="25"
                height="25"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.08333 29.25V26.0833H13.4167V21.175C12.1236 20.8847 10.9694 20.3374 9.95392 19.5331C8.93847 18.7288 8.19272 17.7191 7.71667 16.5042C5.7375 16.2667 4.08186 15.4027 2.74975 13.9122C1.41764 12.4218 0.751056 10.6733 0.75 8.66667V7.08333C0.75 6.2125 1.06033 5.46728 1.681 4.84767C2.30167 4.22806 3.04689 3.91772 3.91667 3.91667H7.08333V0.75H22.9167V3.91667H26.0833C26.9542 3.91667 27.6999 4.227 28.3206 4.84767C28.9412 5.46833 29.2511 6.21356 29.25 7.08333V8.66667C29.25 10.6722 28.5834 12.4207 27.2502 13.9122C25.9171 15.4037 24.2614 16.2677 22.2833 16.5042C21.8083 17.7181 21.0631 18.7277 20.0477 19.5331C19.0322 20.3385 17.8774 20.8858 16.5833 21.175V26.0833H22.9167V29.25H7.08333ZM7.08333 13.1V7.08333H3.91667V8.66667C3.91667 9.66945 4.20694 10.5735 4.7875 11.3789C5.36806 12.1843 6.13333 12.758 7.08333 13.1ZM22.9167 13.1C23.8667 12.7569 24.6319 12.1827 25.2125 11.3773C25.7931 10.5719 26.0833 9.66839 26.0833 8.66667V7.08333H22.9167V13.1Z"
                  fill="#FFD233"
                />
              </svg>
              <span>{score}</span>
            </div>
            <div className="game-header-run-score-item">
              <BsHourglassSplit color="#FFD233" size={25} />
              <span>{MinuteSecondsFomat(remainingTime)}</span>
            </div>
          </div>
        </header>
        <div className="game-action-run">
          <div className="game-action-button-box">
            <button
              onClick={() => {
                setGameState((prev) => {
                  if(prev === "end" || currentPos >= 100 || gameState === "pelenity") return;
                  if (prev === "run") {
                    setMessage("Game Started, Answer the question");
                    return "pause";
                  } else if (prev === "end") {
                    setMessage("Game Restarted");
                    setCurrentPos(0);
                    return "run";
                  } else {
                    setMessage("Game Resumed");
                    return "run";
                  }
                });
              }}
              aria-label="Play/Pause Button"
            >
              {gameState !== "run" ? (
                gameState !== "end" ? (
                  <FaPlay />
                ) : (
                  <MdReplay />
                )
              ) : (
                <FaPause />
              )}
            </button>
            <button>
              <FaQuestion />
            </button>
          </div>
        </div>
        <main className="game-main-run">
          <div className="game-main-run-game">
            <div
              className="game-main-run-game-board"
              style={{
                backgroundImage: `url(${gameBoardImg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: "1",
                width: "80%",
                aspectRatio: "304/317",
                boxShadow: "27px 30px 41px 0px #FFFB0021",
              }}
            >
              {Array(100)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="game-main-run-game-board-tile">
                    {index === boardIndex && (
                      <img
                        src={
                          currentUser
                            ? currentUser.photoURL
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                        alt="User"
                        className="game-main-run-game-board-tile-img"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="game-main-run-questions">
            <div className="game-main-run-questions-box">
              <div className="game-timer-box">
                <CountdownCircleTimer
                  key={timmerKey}
                  size={100}
                  strokeWidth={6}
                  trailColor="#e1ad5f54"
                  isPlaying={gameState === "run" || gameState === "diceRolling" || gameState === "pelenity"}
                  duration={timmerMaxTime}
                  colors={["#27BEFF", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[10, 6, 3, 0]}
                  onComplete={() => {
                    if (gameState === "run" || gameState === "diceRolling" || gameState === "pelenity") {
                      handelTimeOut();
                    } 
                    return { shouldRepeat: true, delay: 0 };
                  }}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
              
              <div className="QuestionBox">
                <div className="game-main-run-question">
                  <h2>{currentQuestion.question || "Question Loading..."}</h2>
                </div>
                <div className="game-main-run-options">
                  <button
                    onClick={() => handelAnswer("A")}
                    style={{
                      backgroundColor:
                        correctAnswer ? correctAnswer === "A" ? "green" : "red" : gameState === "run" ? "#E4A951" : "#e1ad5f54",
                      color: "#151932",
                      cursor: gameState === "run" ? "pointer" : "not-allowed",
                      outline: slelectedOption === "A" ? "4px solid #FFD233" : "none",
                    }}
                  >
                    {currentQuestion.option_a || "Loading..."}
                  </button>
                  <button
                    onClick={() => handelAnswer("B")}
                    style={{
                      backgroundColor:
                        correctAnswer ? correctAnswer === "B" ? "green" : "red" : gameState === "run" ? "#E4A951" : "#e1ad5f54",
                      color: "#151932",
                      cursor: gameState === "run" ? "pointer" : "not-allowed",
                      outline: slelectedOption === "B" ? "4px solid #FFD233" : "none",
                    }}
                  >
                    {currentQuestion.option_b || "Loading..."}
                  </button>

                  <button
                    onClick={() => handelAnswer("C")}
                    style={{
                      backgroundColor:
                        correctAnswer ? correctAnswer === "C" ? "green" : "red" : gameState === "run" ? "#E4A951" : "#e1ad5f54",
                      color: "#151932",
                      cursor: gameState === "run" ? "pointer" : "not-allowed",
                      outline: slelectedOption === "C" ? "4px solid #FFD233" : "none",
                    }}
                  >
                    {currentQuestion.option_c || "Loading..."}
                  </button>

                  <button
                    onClick={() => handelAnswer("D")}
                    style={{
                      backgroundColor:
                        correctAnswer ? correctAnswer === "D" ? "green" : "red" : gameState === "run" ? "#E4A951" : "#e1ad5f54",
                      color: "#151932",
                      cursor: gameState === "run" ? "pointer" : "not-allowed",
                      outline: slelectedOption === "D" ? "4px solid #FFD233" : "none",
                    }}
                  >
                    {currentQuestion.option_d || "Loading..."}
                  </button>
                </div>
              </div>
              {message && (
                <div className="game-main-run-message">
                  <span>{message}</span>
                </div>
              )}
              <div
                className="game-main-run-dice"
                style={{
                  opacity: gameState === "diceRolling" ? "1" : "0.5",
                }}
              >
                <Dice
                  onRoll={handelDiceRoll}
                  size={80}
                  duration={1000}
                  disabled={isMoving || gameState !== "diceRolling"}
                  faceBg="white"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="game-timer">Too lale...</div>;
  }

  return (
    <div className="game-timer">
      {/* <div className="text">Remaining</div> */}
      <div className="value">{remainingTime}</div>
      {/* <div className="text">seconds</div> */}
    </div>
  );
};

const MinuteSecondsFomat = (remainingTime) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  return str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
};

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}
