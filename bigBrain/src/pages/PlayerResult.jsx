import React, { useEffect, useState } from 'react'
import { getCopy } from '../services/helpers';
import { getPlayerResults } from '../services/Player/playerServices';
import PropTypes from 'prop-types'
import NavbarPlayers from '../components/navBarPlayers';

export default function PlayerResult ({ playerId, playerName, points }) {
  const QuestionPoints = getCopy(points)
  QuestionPoints.shift()
  const [results, setResults] = useState([])
  const [playerPoints, setPlayerPoints] = useState(0)

  useEffect(() => {
    getPlayerResults(playerId).then((data) => {
      setResults(data)
    })
    return () => {

    }
  }, [])

  useEffect(() => {
    caluculatePoints()
    return () => {

    }
  }, [results])

  const caluculatePoints = () => {
    let playerPoints = 0
    results.map((result, idx) => {
      if (result.correct) {
        playerPoints = playerPoints + QuestionPoints[idx]
      }
      console.log(playerPoints);
      setPlayerPoints(playerPoints);
      return null
    })
  }
  return (
    <div>
        <NavbarPlayers></NavbarPlayers>

            <h3>{playerName} Score</h3>
           {playerPoints} Points
           {results.map((result, idx) => {
             return <div key={idx}>
                Question {idx + 1}: {result.correct ? 'Correct' : 'Incorrect'}, Points: {result.correct ? QuestionPoints[idx] : 0}
               </div>
           })}
        </div>
  )
}

PlayerResult.propTypes = {
  playerId: PropTypes.any,
  playerName: PropTypes.any,
  points: PropTypes.any
}
