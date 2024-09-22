import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from "semantic-ui-react";
import "./trivia.css"
import mindImg from "../../images/mind.svg";

import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from "../../constants";
import { shuffle } from "../../utils";

import Offline from "../Offline";
import questionsData from "./Ques.json";

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState("0");
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [questionsType, setQuestionsType] = useState("0");
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);
    if (error) setError(null);
    console.log("All Questions Data:", questionsData);
    const categoriesInData = [...new Set(questionsData.map((q) => q.category))];
    console.log("Available Categories:", categoriesInData);

    const filteredQuestions = questionsData.filter((q) => {
      return (
        (category === "0" || q.category === category) &&
        (difficulty === "easy" ? q.difficulty === "easy" : true) &&
        (questionsType === "0" || q.type === questionsType)
      );
    });

    if (filteredQuestions.length < numOfQuestions) {
      const message = (
        <p>
          Not enough questions available for your selection. Please adjust your
          <strong>No. of Questions</strong>, <strong>Difficulty Level</strong>,
          or <strong>Type of Questions</strong>.
        </p>
      );

      setProcessing(false);
      setError({ message });
      return;
    }

    const selectedQuestions = shuffle(filteredQuestions).slice(
      0,
      numOfQuestions
    );
    selectedQuestions.forEach((element) => {
      console.log("Shuffling options:", [
        element.correct_answer,
        ...element.incorrect_answers,
      ]);
    });

    setProcessing(false);
    startQuiz(
      selectedQuestions,
      countdownTime.hours + countdownTime.minutes + countdownTime.seconds
    );
  };


  if (offline) return <Offline />;

  return (
    <Container className="trivia-container">
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} className="image-trivia" />
            <Item.Content>
              <Item.Header className="header-h1">
                <h1 className="trivia-h1">संविधान Encoded</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <p>In which category do you want to play the quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={[
                    { key: "0", value: "0", text: "Any Category" },
                    {
                      key: "1",
                      value: "Legislature of India",
                      text: "Legislature of India",
                    },
                    {
                      key: "2",
                      value: "Executive of India",
                      text: "Executive of India",
                    },
                    {
                      key: "3",
                      value: "Judiciary of India",
                      text: "Judiciary of India",
                    },
                  ]}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />

                <br />
                <p>How many questions do you want in your quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Select No. of Questions"
                  header="Select No. of Questions"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                <p>How difficult do you want your quiz to be?</p>
                <Dropdown
                  fluid
                  selection
                  name="difficulty"
                  placeholder="Select Difficulty Level"
                  header="Select Difficulty Level"
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                />
                <br />
                <p>Which type of questions do you want in your quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="type"
                  placeholder="Select Questions Type"
                  header="Select Questions Type"
                  options={QUESTIONS_TYPE}
                  value={questionsType}
                  onChange={(e, { value }) => setQuestionsType(value)}
                  disabled={processing}
                />
                <br />
                <p>Please select the countdown time for your quiz.</p>
                <div className="timer">
                  <Dropdown
                    search
                    selection
                    name="hours"
                    placeholder="Select Hours"
                    header="Select Hours"
                    options={COUNTDOWN_TIME.hours}
                    value={countdownTime.hours}
                    onChange={handleTimeChange}
                    disabled={processing}
                  />
                  <Dropdown
                    search
                    selection
                    name="minutes"
                    placeholder="Select Minutes"
                    header="Select Minutes"
                    options={COUNTDOWN_TIME.minutes}
                    value={countdownTime.minutes}
                    onChange={handleTimeChange}
                    disabled={processing}
                  />
                  <Dropdown
                    search
                    selection
                    name="seconds"
                    placeholder="Select Seconds"
                    header="Select Seconds"
                    options={COUNTDOWN_TIME.seconds}
                    value={countdownTime.seconds}
                    onChange={handleTimeChange}
                    disabled={processing}
                  />
                </div>
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? "Processing..." : "Play Now"}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
