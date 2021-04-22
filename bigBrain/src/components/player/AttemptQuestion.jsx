import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { sendAnswers } from '../../services/Player/playerServices';
import ShowTimeCounter from '../ShowTimeCounter'
import ShowAnswers from './ShowAnswers';
import PropTypes from 'prop-types'

export default function AttemptQuestion ({ playerId, questionData }) {
  const [timedOut, setTimedOut] = useState(false)
  const {
    answer, isoTimeLastQuestionStarted, points, question, timeLimit, type
  } = questionData.question
  const handleTimeout = () => {
    setTimedOut(true)
  }
  const handleAnwserChange = (answers) => {
    console.log(answers);
    sendAnswers(playerId, answers).then((data) => {
      console.log(data);
    })
  }
  return (
        <Container>
  <Row>

    <Col>
    <Card style={{ width: '18rem' }}>
  <Card.Header>{question.value}</Card.Header>
  <ShowAnswers type={type} answers={answer} handleAnwserChange={handleAnwserChange} disabled={timedOut} />
  <Card.Footer>
        <h5>Question points: {points.value}</h5>
                          {/* Disabling lint for Date.now() as it is predefined constructor and cannot be changed from now() to Now() */}
                          {/* eslint-disable-next-line new-cap */}
      <ShowTimeCounter startTime = {isoTimeLastQuestionStarted || new Date.now()} timeLimit={Number(timeLimit.value)} handleTimeout={handleTimeout}/>
  </Card.Footer>
</Card>
    </Col>
  </Row>
</Container>

  )
}

AttemptQuestion.propTypes = {
  playerId: PropTypes.any,
  questionData: PropTypes.any
}
