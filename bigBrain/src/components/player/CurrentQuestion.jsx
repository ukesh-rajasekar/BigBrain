import React, { useEffect, useState } from 'react'
import { PollGetTimeSinceStarted } from '../../services/Player/playerServices'
import AttemptQuestion from './AttemptQuestion';
import PropTypes from 'prop-types'

export default function CurrentQuestion ({ playerId, points }) {
  const [question, setQuestion] = useState(null)
  useEffect(() => {
    console.log(question?.question?.id);
    PollGetTimeSinceStarted(playerId, question?.question?.id).then((data) => {
      setQuestion(data)
      points(data.question.points.value)
    }).catch((e) => {
      setQuestion(null)
      console.log(e);
    })
  }, [question])
  return (
        <div>
            {question && <AttemptQuestion playerId={playerId} questionData ={question} />}
        </div>
  )
}

CurrentQuestion.propTypes = {
  playerId: PropTypes.any,
  points: PropTypes.any
}
