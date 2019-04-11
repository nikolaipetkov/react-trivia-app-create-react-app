// Render Prop
import React from "react";
import Button from "@material-ui/core/Button";

import QuestionsList from "./QuestionsList";

class TriviaApp extends React.PureComponent {
  state = {
    quizStart: null,
    quizEnd: null,
    totalTimeInMilliseconds: null
  };

  startQuiz = () => {
    this.setState({
      quizStart: Date.now()
    });
  };

  resetQuiz = () => {
    this.setState({
      quizStart: null,
      quizEnd: null,
      totalTimeInMilliseconds: null
    });
  };

  endQuiz = () => {
    this.setState(
      {
        quizEnd: Date.now()
      },
      () => {
        this.setState({
          totalTimeInMilliseconds: this.state.quizEnd - this.state.quizStart
        });
      }
    );
  };

  formatTime = milliseconds => {
    let seconds = parseInt(milliseconds / 1000);
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;

    if (hours && minutes && seconds) {
      return `Your time: ${hours} ${hours > 1 ? "hours" : "hour"} ${minutes} ${
        minutes > 1 ? "minutes" : "minute"
      } ${seconds} ${seconds > 1 ? "seconds" : "second"}`;
    }
    if (!hours && minutes && seconds) {
      return `Your time: ${minutes} ${
        minutes > 1 ? "minutes" : "minute"
      } ${seconds} ${seconds > 1 ? "seconds" : "second"}`;
    }
    if (!hours && !minutes && seconds) {
      return `Your time: ${seconds} seconds`;
    }
  };

  renderContent = () => {
    const { quizStart, quizEnd, totalTimeInMilliseconds } = this.state;

    if (!quizStart) {
      return (
        <Button variant="contained" color="primary" onClick={this.startQuiz}>
          Start Quiz
        </Button>
      );
    }

    if (quizEnd) {
      return (
        <React.Fragment>
          <div>{this.formatTime(totalTimeInMilliseconds)}</div>
          <Button variant="contained" color="primary" onClick={this.resetQuiz}>
            Play Again
          </Button>
        </React.Fragment>
      );
    }
  };

  render() {
    const { quizStart, quizEnd, totalTimeInMilliseconds } = this.state;

    return (
      <React.Fragment>
        {quizStart && <QuestionsList endQuiz={this.endQuiz} />}
        {this.renderContent()}
      </React.Fragment>
    );
  }
}

export default TriviaApp;
