import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { PollGetTimeSinceStarted } from '../../services/Player/playerServices'
import AttemptQuestion from './AttemptQuestion';

export default function CurrentQuestion({playerId}) {
    const [question, setQuestion] = useState(null)
    useEffect(() => {
        console.log(question?.question?.id);
        PollGetTimeSinceStarted(playerId, question?.question?.id).then((data)=>{
            setQuestion(data)
        }).catch((e)=>{
            setQuestion(null)

            console.log(e);
        })

    }, [question])
    return (
        <div>
            <h3>Current Question player Id:{playerId}</h3>
            {question &&<AttemptQuestion playerId={playerId} questionData ={question} />}
        </div>
    )
}
