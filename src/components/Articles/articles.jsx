import React, { useState, useEffect } from "react";
import "./articles.css";
import judiciary from "../../assets/judiciary.png";

const Articles = () => {
  const [step, setStep] = useState(1); // Step 1: Category selection, Step 2: Display articles
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [articles, setArticles] = useState([]); // List of articles fetched from backend
  const [selectedArticle, setSelectedArticle] = useState(""); // Selected article number
  const [searchTerm, setSearchTerm] = useState(""); // Search term for search bar
  const [filteredArticles, setFilteredArticles] = useState([]); // Articles filtered by search term
  const [summary, setSummary] = useState(""); // Summary of selected article
  const [loading, setLoading] = useState(false); // Loading state

  // Handle category selection and fetch articles based on the category
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setStep(2); // Move to step 2 (show articles)

    // Fetch articles based on the selected category from the backend
    setLoading(true);
    try {
      const response = await fetch(
        `https://your-backend-api-url.com/articles?category=${category}`
      );
      const data = await response.json();
      setArticles(data.articles); // Assuming backend returns an array of article numbers
      setFilteredArticles(data.articles); // Initially show all articles in dropdown
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  // Handle search bar input and filter the article numbers
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter articles based on the search term
    if (value === "") {
      setFilteredArticles(articles); // If search bar is empty, show all articles
    } else {
      const filtered = articles.filter((article) =>
        article.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  // Handle article selection from dropdown
  const handleArticleChange = async (e) => {
    const selected = e.target.value;
    setSelectedArticle(selected);

    if (selected) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://your-backend-api-url.com/summarize",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              articleNumber: selected, // Send the selected article number to the backend
            }),
          }
        );
        const data = await response.json();
        setSummary(data.summary); // Set the article summary returned from the backend
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
      setLoading(false);
    } else {
      setSummary(""); // Clear summary if no article is selected
    }
  };

  return (
    <div className="container">
      {step === 1 && (
        <div className="category-grid">
          <div onClick={() => handleCategorySelect("Legislative")}>
            <span>Legislative</span>
            <img src="../../assets/legislative.png" alt="Legislative" />
          </div>
          <div onClick={() => handleCategorySelect("Executive")}>
            <span>Executive</span>
            <img src="/assets/executive.png" alt="Executive" />
          </div>
          <div onClick={() => handleCategorySelect("Judiciary")}>
            <span>Judiciary</span>
            <img src={judiciary} alt="Judiciary" />
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="input-container">
            <label>
              Select Article:
              <select
                value={selectedArticle}
                onChange={handleArticleChange}
                required
              >
                <option value="">-- Select an Article --</option>
                {filteredArticles.map((article, index) => (
                  <option key={index} value={article}>
                    {article}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Search Article:
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for an article..."
              />
            </label>
          </div>

          {/* Show loading spinner while fetching */}
          {loading && <p className="loading">Loading...</p>}

          {/* Display the summary once it's fetched */}
          {summary && (
            <div className="summary-container">
              <h3>{selectedArticle}</h3>
              <p>{summary}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Articles;
