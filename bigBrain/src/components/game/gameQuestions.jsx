import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { useHistory, useRouteMatch } from 'react-router';
import Card from 'react-bootstrap/Card';
function GameQuestion (props) {
  const { question } = props.question;
  const { url } = useRouteMatch();
  const history = useHistory();
  const editQuestion = () => {
    history.push(`${url}/${props.quesId}`);
  };
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>
            Question {props.index + 1}: {question.value}
          </Card.Title>

          <Button
            name="editQuestion"
            variant="primary"
            buttonText="Edit question"
            buttonAction={() => editQuestion()}
          ></Button>
          <Button
            name="deleteQuestion"
            buttonText="Delete question"
            buttonAction={() => props.handleDelete(props.index)}
            variant="danger"
          ></Button>
        </Card.Body>
      </Card>
    </div>
  );
}

GameQuestion.propTypes = {
  question: PropTypes.object,
  quesId: PropTypes.string,
  handleDelete: PropTypes.func,
  index: PropTypes.any,
};

export default GameQuestion;
