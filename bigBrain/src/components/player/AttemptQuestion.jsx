import React,{useState} from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { sendAnswers } from '../../services/Player/playerServices';
import ShowTimeCounter from '../ShowTimeCounter'
import ShowAnswers from './ShowAnswers';

export default function AttemptQuestion({playerId,questionData}) {
    const [timedOut, setTimedOut] = useState(false)
    const {
        answer,id,isoTimeLastQuestionStarted,points,question,timeLimit,type,url
    } = questionData.question
    const handleTimeout = () => {
        setTimedOut(true)
    }
    const handleAnwserChange = (answers)=>{
        console.log(answers);
        sendAnswers(playerId,answers).then((data)=>{
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
      <ShowTimeCounter startTime = {isoTimeLastQuestionStarted || new Date.now()} timeLimit={Number(timeLimit.value)} handleTimeout={handleTimeout}/>
  </Card.Footer>
</Card>
    </Col>
  </Row>
</Container>

    )
}
