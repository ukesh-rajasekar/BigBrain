import React, {useState} from 'react'
import Button from '../components/button'
import Input from '../components/Input'






function Playjoin () {
    const [playerName, setPlayerName] = useState({ name: ''})
    const [sessionId, setSessionId] = useState('')
      const setStateValue = (item, value) => {
        setPlayerName({ ...playerName, [item]: value })
    }

    const setSessionValue = (value) => {
        setPlayerName(value)
    }
   
  return (
    <React.Fragment>
      <div className='join-wrapper'>
          <div className='join-container'>
            <p className='header'>Join Session</p>
            <Input
              name='sessionId'
              placeholder='Session Id'
              className='sessionId'
              type='text'
              handleChange={ setSessionValue}
            />
            <Input
              name='name'
              placeholder='Name'
              className='name'
              type='text'
              handleChange={setStateValue}
            />
            <Button buttonText='Join game' />
          </div>
        </div>
    </React.Fragment>
  )
}

export default Playjoin;