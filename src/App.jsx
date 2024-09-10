import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AIChatbot from "./components/ChatBot/AIChatbot.jsx";
import SignIn from "./components/Sign/SignIn";
import SignUp from "./components/Sign/SignUp";
import ConstitutionDecoder from "./components/ConstitutionDecoder/ConstitutionDecoder.jsx";
import Simplifier from "./components/ConstitutionDecoder/Simplifier.jsx";
import Layout from "./components/LayOut.jsx";
import StartGame from "./components/Game/start-game.jsx";
import Articles from "./components/Articles/articles.jsx";
import Game from "./components/Game/game.jsx";
import About from "./components/About/about.jsx";
import CategoryChatbot from "./components/ChatBot/CategoryChatbot";
import "./App.css";
import { ReactFlowProvider } from "@xyflow/react";
import { AuthProvider } from "./components/AuthContex.jsx";

function App() {
  return (
    <ReactFlowProvider>
      <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ConstitutionDecoder />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chatbot" element={<AIChatbot />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/game" element={<Game />} />
            <Route path="/startgame" element={<StartGame />} />
            <Route path="/about" element={<About />} />
            <Route path="/categorychatbot" element={<CategoryChatbot />} />
            <Route path="/simplifier" element={<Simplifier />} />
          </Routes>
        </Layout>
      </Router>
      </AuthProvider>
    </ReactFlowProvider>
  );
}

export default App;
