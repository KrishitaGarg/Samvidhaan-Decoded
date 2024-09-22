import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Header,
  Menu,
} from "semantic-ui-react";
import he from "he";
import Countdown from "../Countdown";
import { getLetter } from "../../utils";
import "./quiz.css";

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSelectedAns, setUserSelectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const ref = useRef();

  useEffect(() => {
    if (questionIndex > 0 && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questionIndex]);

  const handleItemClick = (e, { name }) => {
    setUserSelectedAns(name);
  };

  const handleNext = () => {
    const isCorrect =
      userSelectedAns === he.decode(data[questionIndex].correct_answer);
    const point = isCorrect ? 1 : 0;

    const qna = [
      ...questionsAndAnswers,
      {
        question: he.decode(data[questionIndex].question),
        user_answer: userSelectedAns,
        correct_answer: he.decode(data[questionIndex].correct_answer),
        point,
      },
    ];

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSelectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = (time) => {
    endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken: time,
      questionsAndAnswers,
    });
  };

  return (
    <Item.Header ref={ref}>
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <div className="question-timer-container">
                  <Header as="h1" block floated="left" className="ques_header">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No. ${questionIndex + 1} of ${data.length}`}
                    </Header.Content>

                    <div className="timer">
                      <Countdown
                        countdownTime={countdownTime}
                        timeOver={timeOver}
                        setTimeTaken={setTimeTaken}
                      />
                    </div>
                  </Header>
                </div>
                <br />
                <Item.Meta>
                  <Message size="huge" floating className="question">
                    <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                  </Message>
                  <br />
                  <Item.Description>
                    <h3>Please choose one of the following answers:</h3>
                  </Item.Description>
                  <Divider />
                  <Menu vertical fluid size="massive">
                    {data[questionIndex].options.map((option, i) => {
                      const letter = getLetter(i);
                      const decodedOption = he.decode(option);

                      return (
                        <Menu.Item
                          key={decodedOption}
                          name={decodedOption}
                          active={userSelectedAns === decodedOption}
                          onClick={handleItemClick}
                        >
                          <b style={{ marginRight: "8px" }}>{letter}</b>
                          {decodedOption}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    content="Next"
                    onClick={handleNext}
                    floated="right"
                    size="big"
                    icon="right chevron"
                    labelPosition="right"
                    disabled={!userSelectedAns}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
