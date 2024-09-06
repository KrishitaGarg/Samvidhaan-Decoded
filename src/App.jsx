import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/ChatBot/ChatBot.jsx";
import SignIn from "./components/SignIn";
import ConstitutionDecoder from "./components/ConstitutionDecoder/ConstitutionDecoder.jsx";
import Layout from "./components/LayOut.jsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ConstitutionDecoder />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
