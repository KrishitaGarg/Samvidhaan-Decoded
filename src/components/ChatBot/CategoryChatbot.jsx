import React, { useState, useEffect, useRef } from "react";
import "./CategoryChatbot.css";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import botLogo from "../../assets/logo.png";
import sendIcon from "../../assets/send.svg";
import { auth } from "../firebase";
import { useTheme } from "../ThemeToggle/ThemeToggle.jsx";
import { useParams, useSearchParams } from "react-router-dom";

const CategoryChatbot = () => {
  const { categoryId: categoryIdParam } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category") || categoryIdParam;

  const backendUrl =
    "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io";
  const messagesEndRef = useRef(null);

  const getAuthToken = async () => {
    const user = auth.currentUser;
    return user ? await user.getIdToken() : null;
  };

  const fetchMessages = async () => {
    if (!categoryId) {
      console.error("No category ID found");
      return;
    }
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(
        `${backendUrl}/message/${categoryId}/get-messages/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching messages, Status: ${response.status}`);
      }

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
    if (categoryId) fetchMessages();
  }, [categoryId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    if (input.trim() === "") {
      console.error("Message is empty");
      return;
    }

    if (!categoryId) {
      console.error("No category ID found");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: No category selected.", isBot: true },
      ]);
      return;
    }

    const userMessage = { text: input, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(
        `${backendUrl}/message/${categoryId}/get-ai-reply/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ question: input }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching reply, Status: ${response.status}`);
      }

      const data = await response.json();
      streamBotMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      streamBotMessage("Welcome to Nyaya.AI! 😊 To continue, please sign in to access all features of our chatbot. If you don't have an account, you can easily create one. Let's get started!");
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
            Nyaya.AI
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

export default CategoryChatbot;
