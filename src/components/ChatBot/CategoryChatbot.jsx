import React, { useState, useEffect, useRef } from "react";
import "./CategoryChatbot.css";
import botLogo from "../../assets/logo.png";
import sendIcon from "../../assets/send.svg";
import { auth } from "../firebase";
import { useLocation } from "react-router-dom";

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

const CategoryChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");

  const backendUrl =
    "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io";

  const messagesEndRef = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryIdFromQuery = queryParams.get("category_id");

  const getAuthToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(
        `${backendUrl}/user/${categoryId}/get-category/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      if (data.id) {
        setCategory(data.name);
      }
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  useEffect(() => {
    if (categoryIdFromQuery) {
      fetchCategoryDetails(categoryIdFromQuery);
    }
  }, [categoryIdFromQuery]);

  const fetchMessages = async () => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${backendUrl}/message/get-messages/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setMessages(
        data.map((msg) => ({
          text: msg.message,
          isBot: msg.role === "bot",
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

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      const botMessage = { text: data.message, isBot: true };
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
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="header-content">
          <img src={botLogo} alt="bot logo" className="header-logo" />
          {category && <h1>Category: {category}</h1>}
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isBot ? "bot" : "user"}`}>
            {msg.isBot && (
              <img src={botLogo} alt="bot logo" className="message-logo" />
            )}
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onInput={autoResize}
          placeholder="Start Typing here..."
          rows={1}
          style={{ maxHeight: "6em", overflowY: "auto", width: "300px" }}
        />
        <img
          src={sendIcon}
          alt="Send"
          className="send-icon"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default CategoryChatbot;
