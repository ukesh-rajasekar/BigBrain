import React, { useEffect, useState } from 'react';
import { PollGetTimeSinceStarted } from '../../services/Player/playerServices';
import AttemptQuestion from './AttemptQuestion';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

export default function CurrentQuestion ({ playerId, points }) {
  const [question, setQuestion] = useState(null);
  useEffect(() => {
    console.log(question?.question?.id);
    PollGetTimeSinceStarted(playerId, question?.question?.id)
      .then((data) => {
        setQuestion(data);
        points(data.question.points.value);
      })
      .catch((e) => {
        setQuestion(null);
        console.log(e);
      });
  }, [question]);
  return (
    <Container style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Row style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
            {question && (
              <AttemptQuestion playerId={playerId} questionData={question} />
            )}
        </Col>
      </Row>
    </Container>
  );
}

CurrentQuestion.propTypes = {
  playerId: PropTypes.any,
  points: PropTypes.any,
};
