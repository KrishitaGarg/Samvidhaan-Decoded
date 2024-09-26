import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AIChatbot from "./components/ChatBot/AIChatbot.jsx";
import CategoryChatbot from "./components/ChatBot/CategoryChatbot.jsx";
import ConstitutionDecoder from "./components/ConstitutionDecoder/ConstitutionDecoder.jsx";
import Simplifier from "./components/ConstitutionDecoder/Simplifier.jsx";
import Layout from "./components/LayOut.jsx";
import StartGame from "./components/Game/start-game.jsx";
import Articles from "./components/Articles/articles.jsx";
import GameOver from "./components/Game/game_over.jsx";
import Game from "./components/Game/game.jsx";
import About from "./components/About/about.jsx";
import Summary from "./components/Summary/summary.jsx";
import Sign from "./components/Sign/sign.jsx";
import "./App.css";
import { ReactFlowProvider } from "@xyflow/react";
import { AuthProvider } from "./components/AuthContex.jsx";
import { ThemeProvider } from "./components/ThemeToggle/ThemeProvider"; 
import TriviaApp from "./components/Trivia/components/App/index.js";
import StartTrivia from "./components/Trivia/components/StartQuiz/start-quiz.jsx";
import MatchingApp from "./components/MatchGame/MatchingGame.jsx";
import MatchOver from "./components/MatchGame/MatchOver.jsx";
import MatchStart from "./components/MatchGame/MatchStart.jsx";
import StartPlay from "./components/Play/Play.jsx";
import Loading from "./components/Loading/Loading.jsx";

function App() {
  return (
    <ReactFlowProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<ConstitutionDecoder />} />
                <Route path="/chatbot" element={<AIChatbot />} />
                <Route
                  path="/category-chatbot/:categoryId"
                  element={<CategoryChatbot />}
                />

                <Route path="/articles" element={<Articles />} />
                <Route path="/game" element={<Game />} />
                <Route path="/startgame" element={<StartGame />} />
                {/* <Route path="/gameover" element={<GameOver />} /> */}
                <Route path="/about" element={<About />} />
                <Route path="/simplifier" element={<Simplifier />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/trivia-app" element={<TriviaApp />} />
                <Route path="/start-trivia" element={<StartTrivia />} />
                <Route path="/matching-game" element={<MatchingApp />} />
                <Route path="/match-over" element={<MatchOver />} />
                <Route path="/match-start" element={<MatchStart />} />
                <Route path="/start-play" element={<StartPlay />} />
                <Route path="/loading" element={<Loading />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ReactFlowProvider>
  );
}

export default App;
