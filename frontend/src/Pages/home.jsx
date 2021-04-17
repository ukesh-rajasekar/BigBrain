import React, { useState, useEffect } from 'react'
import Button from '../Components/button'
import Input from '../Components/Input'
import Navbar from '../Components/navbar'
import { doPost } from '../services/apiService'
import { fetchAllGames, fetchAllGamesByIds } from '../services/gamesService'
import { urls } from '../services/links'
import { showToast } from '../services/toastService'
// import EditQuestion from './editQuestion'

export default function home () {
  const [gameName, setgameName] = useState(false)
  const [formValues, setForm] = useState({ name: '' })
  const [games, setGames] = useState({ })
  // const [id, setId] = useState('')
  const fetchGames = new Promise((resolve, reject) => {
    console.log('fetch games')
    fetchAllGames().then((data) => {
      const ids = []
      for (const quiz of data.quizzes) {
        ids.push(quiz.id)
      }
      fetchAllGamesByIds(ids).then((values) => {
        const games = []
        let count = 0
        for (const value of values) {
          let gameDetails = value.value
          gameDetails = { ...gameDetails, id: ids[count] }
          count = count + 1
          games.push(gameDetails)
        }
        setGames(games)
        resolve()
      })
    })
  }
  )

  useEffect(() => {
    console.log('use effect')
    fetchGames.then(() => console.log(games))
    return () => {

    }
  }, [])
  const setStateValue = (item, value) => {
    setForm({ ...formValues, [item]: value })
  }

  const oncreate = () => {
    console.log('on create');
    doPost(urls.create, formValues).then((res) => {
      console.log(formValues);
      if (res.status === 200) {
        res.json().then((data) => {
          showToast(`Game ${formValues.name} created`, 'success')
          fetchGames.then(() => console.log(games))
        })
      } else {
        showToast('Failed to create game, check input', 'error')
      }
    })
  }

  const onstart = (session) => {
    console.log('on start');
    console.log(session)
    console.log(games)
    doPost(urls.start + `/${session.id}` + '/start', formValues).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          showToast(`Game ${formValues.name} started`, 'success')
          fetchGames.then(() => console.log(games))
        })
      } else {
        showToast('Failed to start game, check input', 'error')
      }
    })
  }

  const onend = (session) => {
    console.log('onend');
    doPost(urls.start + `/${session.id}` + '/end', formValues).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          showToast(`Game ${formValues.name} ended`, 'success')
          fetchGames.then(() => console.log(games))
          console.log(games)
        })
      } else {
        showToast('Game already ended, check input', 'error')
      }
    })
    console.log(games)
  }

  return (
    <div>
      <Navbar></Navbar>
      <h3>Home</h3>
      <Button buttonText="Create" buttonAction={() => setgameName(true)} />
      <div>{(gameName && <Input
              name='name'
              placeholder='Game name'
              className='new-game'
              type='text'
              handleChange={setStateValue}
            />
            )}</div>
 <div>{(gameName && <Button buttonText="Create Game" buttonAction={() => oncreate()} />)}</div>
        <div className="gamesWrapper">
          <div className="gamesContainer">
            {Object.entries(games).map((value) => {
              return (
              <>
              <h3 key={value[0]}>{value[1].name}</h3>
              <Button buttonText="Start Game" buttonAction ={ () => onstart(value[1]) } />
              {/* <div>{alert(value[0])}</div> */}
              <Button buttonText="End Game" buttonAction={ () => onend(value[1]) } />
              </>
              )
            }) }
          </div>
        </div>
    </div>
  )
}
