import React, { useState, useEffect } from 'react'
import Button from '../Components/button'
import Input from '../Components/Input'
import Navbar from '../Components/navbar'
import { doPost } from '../services/apiService'
import { fetchAllGames } from '../services/gamesService'
import { urls } from '../services/links'
import { showToast } from '../services/toastService'

export default function home () {
  const [gameName, setgameName] = useState(false)
  const [formValues, setForm] = useState({ name: '' })
  const [games] = useState({ })

  useEffect(() => {
    const fetchGames = () => {
      fetchAllGames().then((data) => {
        console.log('homeData', data);
      })
    }
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
              return console.log(value)
            }) }
          </div>
        </div>
    </div>
  )
}
