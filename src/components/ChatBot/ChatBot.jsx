import React, { useState } from "react";
import "./ChatBot.css";
import logo from "../../assets/logo.png";

const autoResize = (e) => {
  e.target.style.height = "auto";
  const scrollHeight = e.target.scrollHeight;
  const maxHeight = 3 * parseFloat(getComputedStyle(e.target).lineHeight);

  if (scrollHeight <= maxHeight) {
    e.target.style.height = `${scrollHeight}px`;
  } else {
    e.target.style.height = `${maxHeight}px`;
  }
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi, I am Nyaya.AI. How can I help you?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);
    setInput("");

    // backend API
    try {
      const response = await fetch("BACKEND_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.reply, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "Sorry, something went wrong.",
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h1>Judiciary</h1>
        <p>Article 124</p>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isBot ? "bot" : "user"}`}>
            <img src={logo} alt="logo" className="message-logo" />
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <img src={logo} alt="logo" className="input-logo" />
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onInput={autoResize}
          placeholder="Start Typing here..."
          rows={1}
          style={{ maxHeight: "6em", overflowY: "auto" }}
        />
      </div>
    </div>
  );
};

export default Chatbot;
