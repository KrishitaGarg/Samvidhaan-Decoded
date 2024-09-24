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

  const placeholders = [
    "Please enter your question regarding the Constitution.",
    "What aspect of the Constitution would you like to discuss?",
    "Feel free to ask about constitutional rights or principles.",
    "Inquire about legislative processes or constitutional amendments.",
    "What constitutional topic are you interested in exploring?",
    "How may I assist you with your understanding of the Constitution?",
    "Please share your thoughts or questions about constitutional law.",
    "What would you like to learn about the Constitution today?",
    "Let’s delve into constitutional matters. What’s your question?",
    "Ask me anything related to the Constitution or its interpretation.",
  ];

  const [placeholder, setPlaceholder] = useState("");

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

  useEffect(() => {
    const randomPlaceholder =
      placeholders[Math.floor(Math.random() * placeholders.length)];
    setPlaceholder(randomPlaceholder);
  }, []);

  const streamBotMessage = (message) => {
    const wordsArray = message.split(" ");
    let currentIndex = 0;

    const newMessage = { text: "", isBot: true };

    const intervalId = setInterval(() => {
      if (currentIndex < wordsArray.length) {
        newMessage.text +=
          (newMessage.text ? " " : "") + wordsArray[currentIndex];

        setMessages((prevMessages) => {
          if (
            prevMessages.length === 0 ||
            !prevMessages[prevMessages.length - 1].isBot
          ) {
            return [...prevMessages, newMessage];
          } else {
            return [...prevMessages.slice(0, -1), newMessage];
          }
        });

        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 150);
  };

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

      streamBotMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      streamBotMessage(
        "Welcome to Nyaya.AI! 😊 To continue, please sign in to access all features of our chatbot. If you don't have an account, you can easily create one. Let's get started!"
      );
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
        </div>

        <div className="chatbot">
          <div className="chatbot-header">
            <img src={botLogo} alt="bot logo" className="message-logo" />
            Nyaya<span className="highlight-text">.AI</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`messages ${msg.isBot ? "bot" : "user"}`}
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
              placeholder={placeholder}
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
