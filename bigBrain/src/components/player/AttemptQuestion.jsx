import React from 'react'
import { useParams } from 'react-router-dom';
import { sendAnswers } from '../../services/Player/playerServices';
import ShowTimeCounter from '../ShowTimeCounter'
import ShowAnswers from './ShowAnswers';

export default function AttemptQuestion({playerId,questionData}) {
    
    const {
        answer,id,isoTimeLastQuestionStarted,points,question,timeLimit,type,url
    } = questionData.question
    const handleTimeout = () => {
        alert('timeOut')
    }
    const handleAnwserChange = (answers)=>{
        console.log(answers);
        sendAnswers(playerId,answers).then((data)=>{
            console.log(data);
        })
    }
    return (
        <div>
<h3>question: {question.value}</h3>
<ShowTimeCounter startTime = {isoTimeLastQuestionStarted || new Date.now()} timeLimit={10} handleTimeout={handleTimeout}/>
<ShowAnswers type={type} answers={answer} handleAnwserChange={handleAnwserChange} />
<h3>points: {points.value}</h3>
<h3>url: {url.value}</h3>
        </div>
    )
}
