import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MatchOver.css";
function MatchOver() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;

  const handlePlayAgain = () => {
    navigate("/matching-game"); 
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="match-over">
      <h2>Game Over!</h2>
      <h3>Your Score: {score}</h3>
      <button onClick={handlePlayAgain}>Play Again</button>
      <button onClick={handleHome}>Go Home</button>
    </div>
  );
}

export default MatchOver;
