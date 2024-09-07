import React, { useEffect, useState } from "react";
import gameRunBG from "../../assets/game-run-bg.png";
import "./game.css";
import gameBoardImg from "../../assets/game-board.png";
import hexagonBox from "../../assets/hexagon-box.png";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { FaQuestion } from "react-icons/fa6";



import Dice from 'react-dice-roll-update';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'



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




const ladderPositions = [
  { from: 6, to: 47 },
  { from: 20, to: 41 },
  { from: 37, to: 56 },
  { from: 61, to: 80 },
  { from: 66, to: 96 },
  { from: 71, to: 92 },
]

const snakePositions = [
  { from: 98, to: 46 },
  { from: 72, to: 54 },
  { from: 62, to: 43 },
  { from: 51, to: 13 },
  { from: 39, to: 18 },
  { from: 25, to: 4 },
]


const timmweValue = 10;

export default function Game() {
  const [gameState, setGameState] = useState("start");
  const [gameTimer, setGameTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [currentPos, setCurrentPos] = useState(12);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finalPos, setFinalPos] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [boardIndex, setBoardIndex] = useState(0);
  const [timmerKey, setTimmerKey] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      answer: 1,
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      answer: 2,
    },
    {
      question: "What is the capital of USA?",
      options: ["New York", "Washington D.C.", "Los Angeles", "Chicago"],
      answer: 1,
    },
  ]);

  const { width, height } = useWindowSize()





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
  }
    , [currentPos]);

  useEffect(() => {
    setTimmerKey((prev) => prev + 1);
    if (currentPos >= 100) {
      setGameState("end");
      setCurrentPos(100);
      setFinalPos(currentPos);
      return;
    }
    const ladder = ladderPositions.find((ladder) => ladder.from === currentPos);
    console.log(ladder);
    if (ladder) {
      setCurrentPos(ladder.to);
      setFinalPos(ladder.to);
      return;
    }
    const snake = snakePositions.find((snake) => snake.from === currentPos);
    if (snake) {
      setCurrentPos(snake.to);
      setFinalPos(snake.to);
      return;
    }
  }, [currentPos]);



  return (
    <div style={{
      backgroundImage: `url(${gameRunBG})`,
      backgroundSize: "cover",
      opacity: "0.8",
      minHeight: "89vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "1px",
    }}
    >
      {
        (gameState === "end" || currentPos >= 100) && (
          <Confetti
            width={width * 0.98}
            height={height * 0.98}
          />
        )
      }
      <div className="game-container-run">
        <header className="game-header-run">
          <div className="game-header-run-user">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="User" className="game-header-run-user-img" />
            <span>Hi, {"UserName"}</span>
          </div>
          <div className="game-header-run-score">
            <div className="game-header-run-score-item">
              <svg width="25" height="25" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7046 0.287109C12.1652 0.287109 10.01 0.519531 8.77845 0.984375V2.17969H3.85232V5.83203H23.5569V2.17969H18.6307V0.984375C17.3992 0.519531 15.244 0.287109 13.7046 0.287109ZM10.01 2.97656C10.6873 2.97656 11.2415 3.45203 11.2415 4.03906C11.2415 4.62344 10.6873 5.10156 10.01 5.10156C9.33264 5.10156 8.77845 4.62344 8.77845 4.03906C8.77845 3.45203 9.33264 2.97656 10.01 2.97656ZM17.3992 2.97656C18.0765 2.97656 18.6307 3.45203 18.6307 4.03906C18.6307 4.62344 18.0765 5.10156 17.3992 5.10156C16.7218 5.10156 16.1677 4.62344 16.1677 4.03906C16.1677 3.45203 16.7218 2.97656 17.3992 2.97656ZM2.62078 7.02734V8.22266H1.38925V9.41797H26.0199V8.22266H24.7884V7.02734H2.62078ZM0.157715 10.4805V11.6758H27.2515V10.4805H0.157715ZM1.38925 12.8711V17.6523H10.0639C10.6873 14.1992 16.7218 14.1992 17.3453 17.6523H26.0199V12.8711H1.38925ZM1.38925 18.8477V20.8398H8.77845V22.0352H1.38925V29.9375H10.01V18.8477H1.38925ZM17.3992 18.8477V29.9375H26.0199V22.0352H18.6307V20.8398H26.0199V18.8477H17.3992Z" fill="#E4A951" />
              </svg>
              <span>{gameTimer}</span>
            </div>

            <div className="game-header-run-score-item">
              <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.08333 29.25V26.0833H13.4167V21.175C12.1236 20.8847 10.9694 20.3374 9.95392 19.5331C8.93847 18.7288 8.19272 17.7191 7.71667 16.5042C5.7375 16.2667 4.08186 15.4027 2.74975 13.9122C1.41764 12.4218 0.751056 10.6733 0.75 8.66667V7.08333C0.75 6.2125 1.06033 5.46728 1.681 4.84767C2.30167 4.22806 3.04689 3.91772 3.91667 3.91667H7.08333V0.75H22.9167V3.91667H26.0833C26.9542 3.91667 27.6999 4.227 28.3206 4.84767C28.9412 5.46833 29.2511 6.21356 29.25 7.08333V8.66667C29.25 10.6722 28.5834 12.4207 27.2502 13.9122C25.9171 15.4037 24.2614 16.2677 22.2833 16.5042C21.8083 17.7181 21.0631 18.7277 20.0477 19.5331C19.0322 20.3385 17.8774 20.8858 16.5833 21.175V26.0833H22.9167V29.25H7.08333ZM7.08333 13.1V7.08333H3.91667V8.66667C3.91667 9.66945 4.20694 10.5735 4.7875 11.3789C5.36806 12.1843 6.13333 12.758 7.08333 13.1ZM22.9167 13.1C23.8667 12.7569 24.6319 12.1827 25.2125 11.3773C25.7931 10.5719 26.0833 9.66839 26.0833 8.66667V7.08333H22.9167V13.1Z" fill="#FFD233" />
              </svg>
              <span>{score}</span>
            </div>

          </div>
        </header>
        <div className="game-action-run">
          <div className="game-action-button-box">
            <button
              onClick={() => {
                setGameState((prev) => {
                  if (prev === "run") {
                    return "pause";
                  }
                  else if (prev === "end") {
                    return "run";
                  }
                  else {
                    return "run";
                  }
                }
                )
              }
              }
              aria-label="Play/Pause Button"
            >
              {gameState !== "run" ? gameState !== "end" ? <FaPlay /> : <MdReplay /> : <FaPause />}
            </button>
            <button>
              <FaQuestion />
            </button>
          </div>
        </div>
        <main className="game-main-run">
          <div className="game-main-run-game"
          >
            <div className="game-main-run-game-board"
              style={{
                backgroundImage: `url(${gameBoardImg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: "1",
                width: "80%",
                aspectRatio: "304/317",
              }}
            >
              {
                Array(100).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="game-main-run-game-board-tile"
                  >

                    {
                      (
                        index === boardIndex
                      ) && (
                        <img
                          src="https://www.w3schools.com/howto/img_avatar.png"
                          alt="User"
                          className="game-main-run-game-board-tile-img"
                        />
                      )
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <div className="game-main-run-questions">

            <div className="game-main-run-questions-box">
              <div className="game-timer-box">
                <CountdownCircleTimer
                  key={timmerKey}
                  size={100}
                  strokeWidth={6}
                  trailColor="#151932"
                  isPlaying={gameState === "run" || gameState === "diceRolling"}
                  duration={timmweValue}
                  colors={["#27BEFF", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[10, 6, 3, 0]}
                  onComplete={() => {
                    if (gameState === "run" || gameState === "diceRolling") {
                      // setGameState("end");
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      } else {
                        setGameState("end");
                        setCurrentQuestion(0);
                      }
                      setTimmerKey(timmerKey + 1);
                    }
                    return { shouldRepeat: true, delay: 0 }
                  }}

                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
              {/* <div className="game-main-run-question-timer">
                <span>
                  {gameTimer}
                </span>
               
              </div> */}
              <div className="QuestionBox">
                <div className="game-main-run-question"
                >
                  <h2>{questions[currentQuestion].question}</h2>
                </div>
                <div className="game-main-run-options">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (gameState === "run") {
                          setTimmerKey((prev) => prev + 1);
                          setGameState("diceRolling");
                        }
                      }
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="game-main-run-dice" style={{
                opacity: gameState === "diceRolling" ? "1" : "0.5",
              }}>
                <Dice onRoll={(value) => {
                  if (gameState === "diceRolling") {
                    setIsMoving(true);
                    setTimeout(() => {
                      setIsMoving(false);
                      setCurrentPos(Math.min(100, currentPos + value));
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      } else {
                        setGameState("end");
                        setCurrentQuestion(0);
                        return;
                      }
                      setGameState("run");
                    }, 1000);
                  }
                }}
                  size={80}
                  duration={1000}
                  disabled={isMoving || gameState !== "diceRolling"}
                // faceBg="blue"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
}



// const QuestionBox = ({ children }) => {
//   return (
//     <div style={{
//       backgroundImage: `url(${hexagonBox})`,
//       backgroundSize: "cover",
//       opacity: "1",
//       width: "100%",
//       height: "100%",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       flexDirection: "column",
//       padding: "20px",
//     }}
//     >
//       {children}

//     </div>
//   );
// }