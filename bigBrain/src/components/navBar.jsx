import React, { useContext } from 'react'
import Button from './button'
import { showToast } from '../services/toastServices'
import { Authenticator } from '../contexts/Auth'
import {Navbar as N,Nav} from 'react-bootstrap'

function Navbar (props) {
  const auth = useContext(Authenticator)

  const logOut = () => {
    showToast('See you later', 'info')
    auth.logOut()
  }
  return (
         <N bg="primary" variant="dark">
          <N.Brand href="/admin">Dashboard</N.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/Home">Games</Nav.Link>
        <Nav.Link href="admin/uploadGame">Upload Game</Nav.Link>
          
      </Nav>
          <Button buttonAction={() => logOut()} buttonText="Log Out" >Submit</Button>
    
  </N>
  )
}

export default Navbar
