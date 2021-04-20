import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/navBar';
import { urls } from '../constants/urls';
import { doGet } from '../services/apiRequests';



function Results () {
  const { sessionId, quizId } = useParams()
    const [results, setResults] = useState(null)
    console.log('sss',quizId)


    
    const getresults = () => {
        doGet(`${urls.gameResults}/${sessionId}/results`).then((res) => {
            if (res.status === 200) {
                console.log('got results')
                res.json().then((data) => {
                  console.log('results here');
                  console.log(data);
                    setResults(data)
                })
            } else {
                console.log('no results found')
            }
        })
    }

    useEffect(() => {
      getresults()
      return () => {
      }
    }, [])
    

  return (
    <div>
      <Navbar/>
      <h3>Results</h3>
    </div>
  )
}

export default Results;