import React, { useState, useEffect, useRef } from "react";
import "./AIChatbot.css";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import botLogo from "../../assets/logo.png";
import sendIcon from "../../assets/send.svg";
import { auth } from "../firebase";
import { useTheme } from "../ThemeToggle/ThemeToggle.jsx";

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { theme } = useTheme();

  const backendUrl =
    "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io";

  const messagesEndRef = useRef(null);

  const getAuthToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const fetchMessages = async () => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${backendUrl}/message/get-messages/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error fetching messages");
      const data = await response.json();
      setMessages(
        data.map((msg) => ({
          text: msg.message,
          isBot: msg.role === "AI",
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const token = await getAuthToken();
      const response = await fetch(`${backendUrl}/message/get-ai-reply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: input,
        }),
      });

      if (!response.ok) throw new Error("Error fetching reply");
      const data = await response.json();
      const botMessage = { text: data.message, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong.", isBot: true },
      ]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`${theme}-theme`}>
      <div className="ai-chatbot-section">
        <div className="sidebar">
          <div className="history-header">History</div>
          <div className="history-item">DD/MM/YYYY - Lorem Ipsum</div>
          <div className="history-item">DD/MM/YYYY - Lorem Ipsum</div>
          <div className="history-item">DD/MM/YYYY - Lorem Ipsum</div>
          <button className="clear-history">Clear History</button>
        </div>

        <div className="chatbot">
          <div className="chatbot-header">Nyaya.AI</div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.isBot ? "bot" : "user"}`}
              >
                {msg.isBot && (
                  <img src={botLogo} alt="bot logo" className="message-logo" />
                )}
                <ReactMarkdown
                  className="markdown-body"
                  rehypePlugins={[rehypeSanitize]}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Start Typing here..."
              rows={1}
            />
            <div className="send-icon" onClick={handleSendMessage}>
              <img src={sendIcon} alt="send icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
