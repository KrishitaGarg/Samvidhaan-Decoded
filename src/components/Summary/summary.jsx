import React, { useEffect, useState } from "react";
import "./summary.css";
import { useParams, useSearchParams } from "react-router-dom";
import MarkdownRender from "../markdownrender";

const DetailsPage = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(false);
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const category_id =
    searchParams.get("category") ||
    categoryId;

  useEffect(() => {
    fetchArticles(category_id);
  }, [category_id]);

  const fetchArticles = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io/user/${category}/get-category/`
      );
      const data = await response.json();

      const parsedArticles = parseDescription(data.description);
      setArticles(parsedArticles);
      setName(data.name);
      setDescription(parsedArticles[0]?.summary || "");
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const parseDescription = (description) => {
    return description.split("---").map((articleText, index) => {
      const lines = articleText
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "");

      const title = lines[0]?.replace("# ", "").trim() || "";
      const summary = lines[1]?.replace("## ", "").trim() || "";
      const content = lines.slice(2).join("\n").trim();

      return {
        id: `article-${index}`,
        title: title,
        summary: summary,
        content: content,
        showContent: false,
      };
    });
  };

  const handleRelatedArticlesClick = () => {
    setShowArticles((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const scrollToArticle = () => {
    const article = articles.find(
      (a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.id === searchTerm
    );
    if (article) {
      const element = document.getElementById(article.id);
      if (element) {
        const offset = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };

  const toggleArticleContent = (index) => {
    setArticles((prevArticles) =>
      prevArticles.map((article, i) =>
        i === index
          ? { ...article, showContent: !article.showContent }
          : article
      )
    );
  };

  return (
    <div className="details-page">
      <section className="content">
        <div className="title-section">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>

        <button
          onClick={handleRelatedArticlesClick}
          className="related-articles-button"
        >
          {showArticles ? "Hide Related Articles" : "Show Related Articles"}
        </button>

        {showArticles && (
          <>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search article by title or number"
                value={searchTerm}
                onChange={handleSearch}
                onKeyPress={(e) => {
                  if (e.key === "Enter") scrollToArticle();
                }}
              />
              <button className="go-button" onClick={scrollToArticle}>
                Search
              </button>
            </div>

            {loading ? (
              <p>Loading articles...</p>
            ) : (
              <div className="related-articles">
                {articles.map((article, index) => (
                  <div key={article.id}>
                    <div
                      className="article-title"
                      onClick={() => toggleArticleContent(index)}
                      id={article.id}
                    >
                      <h3>{article.title}</h3>
                    </div>
                    {article.showContent && (
                      <div className="article-details">
                        <MarkdownRender content={article.content} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default DetailsPage;
