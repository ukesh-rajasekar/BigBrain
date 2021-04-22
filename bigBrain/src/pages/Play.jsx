import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Button from '../components/button'
import Input from '../components/Input'
import NavbarPlayers from '../components/navBarPlayers'

function Play () {
  const [playerName, setPlayerName] = useState({ name: 'Guest' })
  const [sessionId, setSessionId] = useState('')

  const history = useHistory()
  const { url } = useRouteMatch()
  const setStateValue = (item, value) => {
    setPlayerName({ ...playerName, [item]: value })
  }

  const setSessionValue = (item, value) => {
    setSessionId(value)
  }

  return (
    <React.Fragment>

      <Container>
        <Row>
          <Col>
          <div className='join-wrapper'>
        <NavbarPlayers></NavbarPlayers>
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
            <Button buttonText='Join game' buttonAction={() => history.push(`${url}/${playerName.name}/${sessionId}`)} />
          </div>
        </div></Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Play;
