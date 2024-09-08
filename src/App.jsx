import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/ChatBot/ChatBot.jsx";
import SignIn from "./components/Sign/SignIn";
import SignUp from "./components/Sign/SignUp";
import ConstitutionDecoder from "./components/ConstitutionDecoder/ConstitutionDecoder.jsx";
import Layout from "./components/LayOut.jsx";
import StartGame from "./components/Game/start-game.jsx";
import Articles from "./components/Articles/articles.jsx";
import Game from "./components/Game/game.jsx";
import About from "./components/About/about.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ConstitutionDecoder />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/game" element={<Game />} />
          <Route path="/startgame" element={<StartGame />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
