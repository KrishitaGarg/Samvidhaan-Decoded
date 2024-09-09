import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import mainImg from "../../assets/main_image.png";
import textImg from "../../assets/text_image.png";

const ConstitutionDecoder = () => {
  const [meaningVisible, setMeaningVisible] = useState(false);
  const [meaning, setMeaning] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState({});

  const handleMouseOver = (event) => {
    const meaningText = event.target.getAttribute("data-meaning");
    setMeaning(meaningText);
    setMeaningVisible(true);

    const rect = event.target.getBoundingClientRect();
    const tooltipPosition = {
      left: `${rect.left + window.scrollX}px`,
      top: `${rect.bottom + window.scrollY + 10}px`,
    };
    setTooltipStyle(tooltipPosition);
  };

  const handleMouseOut = () => {
    setMeaningVisible(false);
  };

  return (
    <div className="constitution-decoder-container">
      <section className="first">
        <div className="text-image-wrapper">
          <div className="simplified-guide-text-container">
            <img src={textImg} className="title-img" alt="Title Image" />

            <h2 className="simplified-guide-text">
              Understanding the Indian Constitution:
              <br />A Simplified Guide
            </h2>

            <div className="button-container">
              <a href="/simplifier">
                <button className="btn explore-btn">
                  Explore Constitution
                </button>
              </a>
              <a href="/startgame">
                <button className="btn play-btn">Let's Play!</button>
              </a>
            </div>
          </div>

          <div className="main-image-container">
            <img src={mainImg} className="main-img" alt="Main Image" />
          </div>
        </div>
      </section>

      <section className="preamble-section">
        <div className="content">
          <div className="image-1">
            <div className="second-p">
              <h1>
                Understanding <span className="wine">Preamble</span>
              </h1>
              <h2>
                With संविधान Decode<span className="wine">d</span>
              </h2>
              <h4>
                "Complex words, Simplified for Everyone—Unlock Understanding
                with <span className="wine">Mr.Hover!</span>"
              </h4>
              <div className="preamble-div">
                <div className="preamble-container">
                  <strong>WE, THE PEOPLE OF INDIA,</strong> having solemnly
                  resolved to constitute India into a{" "}
                  <strong>
                    <span
                      className="word"
                      data-meaning="Independent and self-governing"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      SOVEREIGN
                    </span>{" "}
                    <span
                      className="word"
                      data-meaning="A political system based on collective or governmental ownership and administration"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      SOCIALIST
                    </span>{" "}
                    <span
                      className="word"
                      data-meaning="Impartial to religion, with no state religion"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      SECULAR
                    </span>{" "}
                    <span
                      className="word"
                      data-meaning="Pertaining to government by the people"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      DEMOCRATIC
                    </span>{" "}
                    <span
                      className="word"
                      data-meaning="A form of government where the head of state is elected"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      REPUBLIC
                    </span>
                  </strong>
                  <br />
                  and to secure to all its citizens:
                  <br />
                  <br />
                  <strong>
                    <span
                      className="word"
                      data-meaning="Fair treatment in accordance with the law"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      JUSTICE,
                    </span>{" "}
                  </strong>
                  social, economic and political;
                  <br />
                  <strong>
                    <span
                      className="word"
                      data-meaning="Freedom in thought, expression, belief, faith, and worship"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      LIBERTY
                    </span>{" "}
                  </strong>
                  of thought, expression, belief, faith and worship;
                  <br />
                  <strong>
                    <span
                      className="word"
                      data-meaning="Ensuring equal rights, status, and opportunities for all"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      EQUALITY
                    </span>{" "}
                  </strong>
                  of status and of opportunity; and to promote among them all
                  <br />
                  <strong>
                    <span
                      className="word"
                      data-meaning="Brotherhood and a sense of unity"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      FRATERNITY
                    </span>{" "}
                  </strong>
                  assuring the dignity of the individual
                  <br />
                  and the unity and integrity of the Nation;
                  <br />
                  <br />
                  <strong>IN OUR CONSTITUENT ASSEMBLY</strong> this
                  <br />
                  twenty-sixth day of November, 1949, do
                  <strong>
                    {" "}
                    HEREBY ADOPT, ENACT AND GIVE TO OURSELVES
                    <br />
                    THIS CONSTITUTION.
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {meaningVisible && (
        <div
          id="meaning-box"
          className="meaning-box"
          style={{
            position: "absolute",
            left: tooltipStyle.left,
            top: tooltipStyle.top,
            whiteSpace: "normal",
            maxWidth: "250px",
          }}
        >
          <div className="tooltip-content">{meaning}</div>
        </div>
      )}
    </div>
  );
};

export default ConstitutionDecoder;
