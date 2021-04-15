import React, { useState, useEffect } from 'react'
import Button from '../Components/button'
import Input from '../Components/Input'
import Navbar from '../Components/navbar'
import { doPost } from '../services/apiService'
import { fetchAllGames, fetchAllGamesByIds } from '../services/gamesService'
import { urls } from '../services/links'
import { showToast } from '../services/toastService'

export default function home () {
  const [gameName, setgameName] = useState(false)
  const [formValues, setForm] = useState({ name: '' })
  const [games, setGames] = useState({ })
  const fetchGames = () => {
    fetchAllGames().then((data) => {
      const ids = []
      for (const quiz of data.quizzes) {
        ids.push(quiz.id)
      }
      fetchAllGamesByIds(ids).then((values) => {
        const games = []
        for (const value of values) {
          const gameDetails = value.value
          games.push(gameDetails)
        }
        setGames(games)
      })
    })
  }
  useEffect(() => {
    fetchGames()
    return () => {

    }
  }, [])
  const setStateValue = (item, value) => {
    setForm({ ...formValues, [item]: value })
  }

  const oncreate = () => {
    doPost(urls.create, formValues).then((res) => {
      console.log(formValues);
      if (res.status === 200) {
        res.json().then((data) => {
          showToast(`Game ${formValues.name} created`, 'success')
          fetchGames()
        })
      } else {
        showToast('Failed to create game, check input', 'error')
      }
    })
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
 <div>{(gameName && <Button buttonText="Create Game" buttonAction={oncreate} />)}</div>
        <div className="gamesWrapper">
          <div className="gamesContainer">
            {Object.entries(games).map((value) => {
              return <h3 key={value[0]}>{value[1].name}</h3>
            }) }
          </div>
        </div>
    </div>
  )
}
