import React, { useState } from 'react';
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getCopy } from '../../services/helpers';
import PropTypes from 'prop-types';

export default function ShowAnswers ({
  type,
  answers,
  handleAnwserChange,
  disabled,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const handleUpdates = (targetValue, id) => {
    console.log(targetValue, id, selectedAnswers);
    if (targetValue) {
      if (type.value === 'multiple-choice') {
        setSelectedAnswers(getCopy([...selectedAnswers, id]));
        handleAnwserChange(getCopy([...selectedAnswers, id]));
      } else {
        setSelectedAnswers(getCopy([id]));
        handleAnwserChange(getCopy([id]));
      }
    } else {
      const temp = selectedAnswers;
      const index = temp.indexOf(id);
      console.log(index);
      if (index > -1) {
        temp.splice(index, 1);
      }
      setSelectedAnswers(getCopy(temp));
      handleAnwserChange(getCopy(temp));
    }
    console.log(selectedAnswers);
  };
  if (type.value === 'multiple-choice') {
    return (
      <ListGroup className="list-group-flush">
        {answers.value.map((choice, idx) => {
          return (
            <ListGroupItem key={idx}>
              <label htmlFor={idx}>{choice.answer}</label>
              <input
                disabled={disabled}
                type="checkbox"
                name={idx}
                id={choice.id}
                onChange={(e) => handleUpdates(e.target.checked, choice.id)}
              ></input>
              {disabled && choice.isCorrectAnswer && (
                <Badge variant="success">Correct answer</Badge>
              )}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
  return (
    <ListGroup className="list-group-flush">
      {answers.value.map((choice, idx) => {
        return (
          <ListGroupItem key={idx}>
            <label htmlFor={idx}>{choice.answer}</label>
            <input
              type="radio"
              disabled={disabled}
              name={idx}
              id={choice.id}
              value={choice.id}
              checked={choice.id === selectedAnswers[0]}
              onChange={(e) => handleUpdates(e.target.checked, choice.id)}
            />
            {disabled && choice.isCorrectAnswer && (
              <Badge variant="success">Correct answer</Badge>
            )}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}

ShowAnswers.propTypes = {
  type: PropTypes.any,
  answers: PropTypes.any,
  handleAnwserChange: PropTypes.any,
  disabled: PropTypes.any,
};
