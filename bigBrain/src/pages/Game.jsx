import React,{useState, useEffect} from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import CurrentQuestion from '../components/player/CurrentQuestion'
import { getCopy } from '../services/helpers'
import { getPlayerId, pollGameStart, pollGameEnd } from '../services/Player/playerServices'
import {showToast} from '../services/toastServices'
import PlayerResult from './PlayerResult'

export default function Game() {
    const {playerName,sessionId} = useParams('Guest')
    const [playerId, setPlayerId] = useState(null)
    const [gameStarted, setGameStarted] = useState(false)
    const [questionPoints, setquestionPoints] = useState([])
    const [questionPoint, setquestionPoint] = useState()
    const [gameEnded, setGameEnded] = useState(false)
    const history = useHistory()
    const {url} = useRouteMatch()
    const points = (point) => {
        setquestionPoint(Number(point))
        
    }
    useEffect(() => {
        const temp = getCopy(questionPoints)
        temp.push(questionPoint)
        setquestionPoints(temp)
        console.log(temp);
        console.log(questionPoints);
        return () => {
            
        }
    }, [questionPoint])
    useEffect(() => {
        getPlayerId(sessionId, playerName).then((data)=> {
            if(data?.error){
                showToast(data.error, "error")
            }else{
                setPlayerId(data.playerId)

                showToast(`${playerName} Joined the game`, "info")
                pollGameStart(data.playerId).then(()=>{
                    showToast("Game Started", "info")
                    setGameStarted(true)
                    pollGameEnd(data.playerId).then(()=>{
                        showToast("Game Ended", "info")
                        setGameEnded(true)
                        // history.push(`${url}/result`)
                    })

                }).catch(()=> {
                    showToast('Game Ended', 'info')
                    setGameEnded(true)
                    setGameStarted(true)
                })

            }
        })
        return () => {
            
        }
    }, [])
    if(!gameStarted){
        return <div>
            <h3>Waiting for the game to start</h3>
        </div>
    } else if (gameEnded) {
        return  <PlayerResult playerId = {playerId} playerName = {playerName} points = {questionPoints}/>
    }
    return (
        <div>
            <h3>Welcome {playerName},{sessionId}</h3>
            <h3>Active session: {sessionId}</h3>
            <CurrentQuestion playerId={playerId} points = {points} />
        </div>
    )
}