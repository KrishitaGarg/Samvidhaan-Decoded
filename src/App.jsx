import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/ChatBot/ChatBot.jsx";
import SignIn from "./components/SignIn";
import ConstitutionDecoder from "./components/ConstitutionDecoder/ConstitutionDecoder.jsx";
import Layout from "./components/LayOut.jsx";
import StartGame from "./components/Game/start-game.jsx";
import Instructions from "./components/Game/instructions.jsx";
import Articles from "./components/Articles/articles.jsx";
/*import Game from "./components/Game/game.jsx";*/

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ConstitutionDecoder />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/startgame" element={<StartGame />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
