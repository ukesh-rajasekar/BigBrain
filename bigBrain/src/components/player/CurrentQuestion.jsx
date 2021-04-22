import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { PollGetTimeSinceStarted } from '../../services/Player/playerServices'
import AttemptQuestion from './AttemptQuestion';

export default function CurrentQuestion({playerId, points}) {
    const [question, setQuestion] = useState(null)
    useEffect(() => {
        console.log(question?.question?.id);
        PollGetTimeSinceStarted(playerId, question?.question?.id).then((data)=>{
            setQuestion(data)
            points(data.question.points.value)
        }).catch((e)=>{
            setQuestion(null)
            console.log(e);
        })

    }, [question])
    return (
        <div>
            {question &&<AttemptQuestion playerId={playerId} questionData ={question} />}
        </div>
    )
}
