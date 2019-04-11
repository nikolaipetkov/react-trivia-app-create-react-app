import React from "react";
import PropTypes from "prop-types";

import Question from "./Question";
import api from "../api";

class QuestionsList extends React.PureComponent {
  state = {
    questions: [],
    answers: [null, null, null, null, null, null, null, null, null, null],
    correctAnswers: [],
    score: 0
  };

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
  }

  componentDidUpdate() {
    if (this.state.answers.every(item => item !== null)) {
      this.calculateScore();
    }
  }

  fetchQuestionsAndAnswers = async () => {
    const result = await api.fetchData();

    const correctAnswers = result.map(question => question.correct_answer);

    this.setState({
      questions: result,
      correctAnswers
    });
  };

  handleAnswer = (id, value) => {
    this.setState(state => {
      const answers = state.answers.map((item, index) => {
        if (index === id) {
          return value;
        } else {
          return item;
        }
      });

      return {
        answers
      };
    });
  };

  calculateScore() {
    const { endQuiz } = this.props;
    let currentScore = 0;
    this.state.correctAnswers.map((value, index) => {
      if (value === this.state.answers[index]) {
        currentScore += 1;
      }
    });

    this.setState({
      score: currentScore
    });
    endQuiz();
  }

  renderContent() {
    const { questions, score } = this.state;

    if (score !== 0) {
      return <div>Total Score is : {score} </div>;
    }

    return (
      <React.Fragment>
        {questions.map((question, index) => (
          <Question
            key={index}
            text={question.question}
            index={index}
            handleAnswer={this.handleAnswer}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return this.renderContent();
  }
}

QuestionsList.propTypes = {
  endQuiz: PropTypes.func.isRequired
};

export default QuestionsList;
