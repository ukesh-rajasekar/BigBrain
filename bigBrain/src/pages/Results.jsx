import React, {useState} from 'react'
import Navbar from '../components/navBar';
import { urls } from '../constants/urls';
import { doGet } from '../services/apiRequests';



function Results () {
    const [results, setResults] = useState('')
    
    const getresults = () => {
        doGet(urls.gameResults + '/363137/results').then((res) => {
            if (res.status === 200) {
                console.log('got results')
                res.json().then((data) => {
                    setResults(data)
                    console.log(results)
                })
            } else {
                console.log('no results found')
            }
        })
    }

  return (
    <div>
      <Navbar/>
      <h3>Results</h3>
    </div>
  )
}

export default Results;