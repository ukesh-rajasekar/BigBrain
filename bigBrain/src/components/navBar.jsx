import React, { useContext } from 'react'
import Button from './button'
import { showToast } from '../services/toastServices'
import { Authenticator } from '../contexts/Auth'
import { Navbar as N, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
function Navbar (props) {
  const auth = useContext(Authenticator)

  const logOut = () => {
    showToast('See you later', 'info')
    auth.logOut()
  }
  return (
         <N bg="primary" variant="dark">
          <N.Brand href="/admin">Dashboard <FontAwesomeIcon icon={faHome} /></N.Brand>
          <Nav className="mr-auto">
        <Nav.Link href="admin/uploadGame">Upload Game <FontAwesomeIcon icon={faUpload} /></Nav.Link>

      </Nav>
      <>
          <Button name ="logout" buttonAction={() => logOut()} buttonText={<>Log Out <FontAwesomeIcon color="white" icon={faSignOutAlt} /></>} > </Button>

      </>
  </N>
  )
}

export default Navbar
