import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GameResultStats from '../components/game/GameResultStats'
import Navbar from '../components/navBar'
import { fetchQuizData } from '../services/games/gameService'
import { getCopy } from '../services/helpers'

export default function Results () {
  const [oldSessions, setOldsessions] = useState([])

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)
  const [error, setError] = useState('Falied to load results')

  // const [playersGameStats, setPlayerGameStat ] = useState({})
  const { gameId, sessionId } = useParams()

  useEffect(() => {
    fetchQuizData(gameId).then((data) => {
      console.log(data);
      setQuestions(data.questions)
      const oldsessions = getCopy(data.oldSessions)
      oldsessions.splice(oldsessions.indexOf(sessionId), 1)
      setOldsessions(oldsessions)
      setLoading(false)
    }).catch((e) => {
      console.log(e);
      setIsErrored(true)
      setError('failed to load results')
    })

    return () => {
    }
  }, [])

  if (isErrored) {
    return (
    <div>
        <h3>Result of game {gameId} in session with ID {sessionId}</h3>
        <h4>{error }</h4>

    </div>
    )
  } else if (loading) {
    return <h3>Loading Results</h3>
  }
  return (
    <div>
      <Navbar></Navbar>

      <GameResultStats questions={questions} sessionId={ sessionId } gameId={ gameId } showStatusDefault={true} />
      <h3>Other Sessions</h3>
      {oldSessions.map((value, idx) => {
        return <div key={idx}>
          <h3>Results For session { value }</h3>
          <GameResultStats questions={questions} sessionId={ value } gameId={ gameId } showStatusDefault={true}/>
        </div>
      })}
    </div>
  )
}

// Table of up to top 5 users and their score
