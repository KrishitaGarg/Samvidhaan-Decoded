import React, { useState, useEffect, useRef} from "react";
import "./ChatBot.css";
import botLogo from "../../assets/logo.png";
import sendIcon from "../../assets/send.svg";
import { auth } from "../firebase";

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [article, setArticle] = useState("");
  const [articlesList, setArticlesList] = useState([]);
  const [baseCategories, setBaseCategories] = useState([]);

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

  const fetchBaseCategories = async () => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${backendUrl}/user/get-base-category/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      console.log("Fetched base categories:", data);

      if (data.children && Array.isArray(data.children)) {
        const categoriesArray = data.children.map((category) => ({
          id: category.id,
          name: category.name,
        }));
        setBaseCategories(categoriesArray);
      } else {
        console.error("Unexpected data format for categories:", data);
      }
    } catch (error) {
      console.error("Error fetching base categories:", error);
    }
  };

  const fetchArticles = async (categoryId) => {
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
      console.log("Fetched articles:", data);

      if (data.children && Array.isArray(data.children)) {
        const articlesArray = data.children.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        setArticlesList(articlesArray);
      } else {
        console.error("Unexpected data format for articles:", data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
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
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      console.log("Fetched messages:", data);
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
    fetchBaseCategories();
    fetchMessages();
  }, []);

  useEffect(() => {
    if (category) {
      fetchArticles(category);
    }
  }, [category]);

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

          <div className="dropdowns">
            <h1>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a Category</option>
                {baseCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </h1>
            <p>
              <select
                value={article}
                onChange={(e) => setArticle(e.target.value)}
              >
                <option value="">Select an Article</option>
                {articlesList.map((art) => (
                  <option key={art.id} value={art.id}>
                    Article {art.id}
                  </option>
                ))}
              </select>
            </p>
          </div>
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

export default Chatbot;
