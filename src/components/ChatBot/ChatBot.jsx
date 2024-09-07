import React, { useState, useEffect } from "react";
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
  const [category, setCategory] = useState("");
  const [article, setArticle] = useState("");
  const [articlesList, setArticlesList] = useState([]);

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("BACKEND_ARTICLES_URL");
        const data = await response.json();
        setArticlesList(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === "") return; // Ensure a category is selected

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);
    setInput("");

    // Send message, category, and article to backend
    try {
      const response = await fetch("BACKEND_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          article,
          message: input,
        }),
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
        <h1>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="legislature">Legislature</option>
            <option value="executive">Executive</option>
            <option value="judiciary">Judiciary</option>
          </select>
        </h1>
        <p>
          <select value={article} onChange={(e) => setArticle(e.target.value)}>
            <option value="">Select an Article</option>
            {articlesList.map((art, index) => (
              <option key={index} value={art.number}>
                Article {art.number}
              </option>
            ))}
          </select>
        </p>
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
