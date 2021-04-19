import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { useHistory, useRouteMatch } from "react-router";

function GameQuestion(props) {
    const { question } = props.question;
    const {url} = useRouteMatch()
    const history = useHistory()
  const editQuestion = () => {
    history.push(`${url}/${props.quesId}`)
  };
  return (
    <div>
      <h3>
        Question {props.index + 1}: {question.value}
      </h3>
     
      <Button
        buttonText="Edit question"
        buttonAction={() => editQuestion()}
      ></Button>
    </div>
  );
}

GameQuestion.propTypes = {
    question: PropTypes.object,
    quesId: PropTypes.string,
};

export default GameQuestion;
