import React, {useEffect, useState} from 'react'
import { getCopy } from '../services/helpers';
import { getPlayerResults } from '../services/Player/playerServices';

export default function PlayerResult({playerId, playerName, points}) {
    const QuestionPoints = getCopy(points)
    console.log(points);

    QuestionPoints.shift() 
    console.log(QuestionPoints);

    const [results, setResults] = useState([])
    const [playerPoints, setPlayerPoints] = useState(0)

    useEffect(() => {
        getPlayerResults(playerId).then((data)=> {
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

    const caluculatePoints =() => {
        let playerPoints = 0
        results.map((result, idx) => {
            console.log(result);
            if (result.correct){
                playerPoints = playerPoints + QuestionPoints[idx]
            }
            console.log(playerPoints);
            setPlayerPoints(playerPoints);
        })
    }
    return (
        <div>
            <h3>Your Score</h3>
           {playerPoints} Points
           {results.map((result,idx)=> {
               return <div> 
                Question {idx+1}: {result.correct?"Correct": "Incorrect"}, Points: {result.correct?QuestionPoints[idx]:0}
               </div>
           })}
        </div>
    )
}
