import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { barChart } from '../components/game/Bar';
import Navbar from '../components/navBar';
import { urls } from '../constants/urls';
import { doGet } from '../services/apiRequests';
import { loginAdmin } from '../services/Auth/authServices';
import { fetchQuizData } from '../services/games/gameService';
import { getCopy } from '../services/helpers';
import {Bar} from 'react-chartjs-2';
import { showToast } from '../services/toastServices';



function Results () {
  const { sessionId, quizId } = useParams()
    const [results, setResults] = useState([])
    const [questionPoints, setQuestionPoints] = useState([])
    const [playerPoints, setPlayerPoints] = useState([])
    const [PlayerNames, setPlayerNames] = useState([])
    const [labels, setLabels] = useState([])
    const [percentCrct, setPercentCrct] = useState([])
   const [Percent, setPercent] = useState([])


    
    const getresults = () => {
        return doGet(`${urls.gameResults}/${sessionId}/results`).then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
              return new Promise((resolve, reject) => {
                resolve({error:'no results found'})
              } )
            }
        })
    }

    useEffect(() => {
      const tempQuestionPoints = []
      const tempLabels = []
      const tempPoints = []
      fetchQuizData(quizId).then((data) => {
        data.questions.map((question, idx) => {
          tempQuestionPoints.push(Number(question.points.value))
          tempLabels.push(`Q${idx}`)
          Percent.push(0)
         setPercent(Percent)
         getresults().then((data) => {
          if (!data?.error) {
            setResults(data.results)
            data?.results.map((result, idx) => {
              calculatePoints(result,tempPoints)
            })
          } else {
            showToast(data.error)
          }
        })
      })
      setQuestionPoints(tempQuestionPoints)
      setLabels(tempLabels)
    })
    
      return () => {
      }
    }, [])

 

  //   useEffect(() => {
  //     const tempPoints = []
  //     const names = []
  //     results.map((result, idx) => {
  //       return calculatePoints(result, names, tempPoints, Percent)
  //     })
  //     setPlayerPoints(tempPoints)
  //     setPlayerNames(names)


  //     const getPrecent = []
  //     const total = Number(PlayerNames.length)
  //     // Percent.map((partialValue, idx) => {
  //     //   getPrecent.push((partialValue/total) * 100)
  //     //   console.log('$$$$$$$$$$$$$$$$',getPrecent)
  //     // })
  //     const finalPercent = Percent.map(item => item * 100 / total);
  //     setPercentCrct(finalPercent)
  //     console.log(finalPercent);
  //       return () => {
          
  //     }
  // }, [])

  const calculatePoints =(result, tempPoints) => {
    
      let points = 0
      // names.push(result.name)
      result.answers.map((answer, idx) => {
        console.log(idx);
          if (answer.correct){
              points = points + questionPoints[idx]
              let tempPercent = Percent
              console.log('Percent',Percent);
              console.log('tempPercent',tempPercent);
              tempPercent[idx] = tempPercent[idx] + 1
              setPercent(tempPercent)
          }
      })
      tempPoints.push({[result.name]:points})
  }

  
const state = {
  labels: labels,
  datasets: [
    {
      label: 'Players',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: percentCrct
    }
  ]
} 

// console.log(playerPoints);
// console.log(PlayerNames);
// console.log(playerPoints);
// console.log(results);
console.log(Percent);
  return (
    <div>
      <Navbar/>
      <h3>Results {state.datasets.data}</h3>
      <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Points</th>
        </tr>
           {PlayerNames.map((name,idx)=> {
               return <>
               <tr>
                 <td>{name}</td>
                <td>{playerPoints[idx]}</td>
               </tr></>
               
           })}
        </table>
      </div>
      <div>
        <h3>Players performance Analysis</h3>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
  ) 
}

export default Results;