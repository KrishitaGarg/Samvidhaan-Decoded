import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import mainImg from "../../assets/img.png";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ConstitutionDecoder = () => {
  const [meaningVisible, setMeaningVisible] = useState(false);
  const [meaning, setMeaning] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentInfo, setCurrentInfo] = useState("");

  const classifications = {
    Union:
      "The central government, which holds authority over the entire nation.",
    State:
      "The government at the state level, responsible for the governance of individual states.",
    Executive:
      "Branch responsible for enforcing laws and administering government policies.",
    Judiciary:
      "Branch responsible for interpreting laws and administering justice.",
    Parliament: "The legislative body responsible for creating laws.",
    President: "The head of state in a republic system of government.",
    "Attorney-General": "Chief legal advisor to the government.",
    "Council of Members":
      "A body of members within the Executive responsible for aiding in decision-making.",
    "Officers of Parliament":
      "Members who help Parliament function effectively.",
    "Power Privileges":
      "Special rights and privileges granted to the Parliament and its members.",
    "General Procedure":
      "The set of rules followed by Parliament in its workings.",
    "Legislative Procedure": "The process by which laws are made and passed.",
  };

  const handleClick = (title) => {
    setCurrentTitle(title);
    setCurrentInfo(classifications[title]);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

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
    <div>
      <section className="main">
        <div className="content">
          <div className="image-1">
            <div className="second">
              <div className="third">
                <img src={mainImg} className="logo mainimg" alt="Logo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main">
        <div className="content">
          <div className="image-1">
            <div className="second-p">
              <h1>
                Understanding <span>Preamble</span>
              </h1>
              <h2>With संविधान Decoded</h2>
              <h4>
                "Complex words, Simplified for Everyone—Unlock Understanding
                with <span>Mr.Hover!</span>"
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

      <section className="main">
        <div className="content">
          <div className="image-1">
            <div className="second-p">
              <h1>
                Understanding <span>Constitution</span>
              </h1>
              <h2>With संविधान Decoded</h2>
              <h4>
                "The website provides a streamlined interface that presents
                simplified summaries of all the articles in the constitution,
                making it easy for users to understand complex legal texts.!"
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for showing classification details */}
      <Modal show={modalVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{currentInfo}</Modal.Body>
      </Modal>
    </div>
  );
};

export default ConstitutionDecoder;
