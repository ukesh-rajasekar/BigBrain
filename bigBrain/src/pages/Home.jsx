import React, {useState, useEffect} from 'react'
import Button from '../components/button'
import Input from '../components/Input'
import Navbar from '../components/navBar';  
import Popup from '../components/popups';
import { urls } from '../constants/urls';
import { doPost, doGet } from '../services/apiRequests';
import { showToast } from '../services/toastServices';
import { useHistory } from 'react-router';
import { fetchAllGames, fetchAllGamesByIds } from '../services/games/gameService'


// import Navbar from '../Components/navbar'

export const Home = () => {
    const history = useHistory();
    const [gameName, setGameName] = useState({ name: ''})
    const [games, setGames] = useState({ })
    const [newGame, setNewGame] = useState(false)
    const [sessionStatus, setSessionStatus] = useState(false)
    const [sessionId, setSessionId] = useState('')
    const [sessionOpen, setSessionOpen] = useState(false);
    const [sessionClose, setSessionClose] = useState(false);

    const fetchGames = () => {
        fetchAllGames().then((data) => {
          const ids = []
          for (const quiz of data.quizzes) {
            ids.push(quiz.id)
          }
          fetchAllGamesByIds(ids).then((values) => {
            const games = []
            Object.entries(values).map(([,value], idx) => {
                const gameData = value.value
                const gameDetails = {...gameData, id: ids[idx]}
              games.push(gameDetails)
            })

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
        setGameName({ ...gameName, [item]: value })
      }

    const oncreate = () => {
        doPost(urls.create, gameName).then((res) => {
            if (res.status === 200) {
                console.log('created');
                showToast(`Game ${gameName} created`, 'success')
            } else {
                //console.log('Invalid request')
                showToast('Game ${gameName} creation failed', 'error')
            }
        })
        setNewGame(false)
    }

    const onstart = (gameId) => {
        doPost(urls.gameSession + `/${gameId}/start` ).then((res) => {
            if (res.status === 200) {
                console.log('created');
                showToast(`Game started`, 'success')
                doGet(urls.gameSession + `/${gameId}` ).then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setSessionId(data.active)
                            setSessionOpen(true)
                        })
                    }
                })
                setSessionStatus(!sessionStatus)
            } else {
                //console.log('Invalid request')
                showToast('Game cannot be created', 'error')
            }
        })
    }

    const onend = (gameId) => { 
        doPost(urls.gameSession + `/${gameId}/end`).then((res) => {
            if (res.status === 200) {
                console.log('ended');
                showToast(`Game ended`, 'success')
                // doPost(urls.gameSession + '997161454').then((res) => {
                //     if (res.status === 200) {
                //         res.json().then((data) => {
                //             alert(data.active)
                //         })
                //     }
                // })
                setSessionStatus(!sessionStatus)
                setSessionOpen(false)
                setSessionClose(true)
            } else {
                //console.log('Invalid request')
                showToast('Game could not be ended', 'error')
            }
        })
    }

    const gotoresults = (sessionId)=> {
        setSessionClose(false)
        console.log(sessionId)
        history.push(`/dashboard/session/${sessionId}/results`)
    }

    return (
      <React.Fragment>
        <Navbar/>
        <h1>Home</h1>
        <div>
        <Button buttonText = 'create a new game' buttonAction = {()=> setNewGame(true)} />
        
        </div>


        <div>{(newGame && <Input
              name='name'
              placeholder='Enter the game`s name'
              className='new-game'
              type='text'
              handleChange={setStateValue}
            />)}</div>
        <div>{(newGame && <Button buttonText = 'Submit' buttonAction = {oncreate} />)}</div>
        <div>
<div className="gamesWrapper">
          <div className="gamesContainer">
            {Object.entries(games).map((value) => {
              return <React.Fragment key={value[1].id}><h3 key={value[0]}>{value[1].name}</h3>
              <div>{(!sessionStatus && <Button buttonText = 'Start game' buttonAction = {()=> onstart (value[1].id)} />)}</div>
        <div>{(sessionStatus && <Button buttonText = 'End game' buttonAction = {()=> onend (value[1].id)} />)}</div>
              </React.Fragment>
            }) }
          </div>
        </div>

        <div>{(sessionOpen && <Popup
      content={<>
        <b>Session {sessionId} Started!!!</b>
        <Button buttonText = 'Copy session link' buttonAction = {() =>  navigator.clipboard.writeText(sessionId)} />
      </>}
      handleClose={() => setSessionOpen(false)}
    />)}</div>

    <div>{(sessionClose && <Popup
      content={<>
        <b>Would you like to view the results?</b>
        <Button buttonText = 'Yes' buttonAction = { () => {gotoresults (sessionId)}} />
        <Button buttonText = 'No' buttonAction = {() => {setSessionClose(false)}} />
      </>}
      handleClose={() => setSessionClose(false)}
    />)}</div>

        
        </div>
      </React.Fragment>
    );
  };