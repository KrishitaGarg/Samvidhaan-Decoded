import React, { useEffect, useState } from "react";
import "./summary.css";
import { useParams } from "react-router-dom";
import Markdownrender from "../markdownrender";
import { useSearchParams } from "react-router-dom";

const DetailsPage = () => {
  const parmas = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("category"));

  let category_id =
    searchParams.get("category") || "bc0276d3-1df1-4639-9bf0-592309710ed5";

  useEffect(() => {
    feathArticle(category_id);
  }, []);

  const feathArticle = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io/user/${category_id}/get-category/`
      );
      const data = await response.json();
      console.log(data);
      setDescription(data.description);
      setName(data.name);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  return (
    <div className="details-page">
      <section className="content">
        <div className="title-section">
          <h1>{name || "Officers Of The State"}</h1>
        </div>
        <div className="description">
          <Markdownrender content={description} />
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;
