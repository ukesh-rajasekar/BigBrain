import React, { useContext } from 'react'
import Button from './button'
import { showToast } from '../services/toastServices'
import { Authenticator } from '../contexts/Auth'


function Navbar (props) {
  const auth = useContext(Authenticator)

  const logOut = () => {
    showToast('See you later', 'info')
    auth.logOut()
  }
  return (
        <div>
          <ul>
              <li> <Button buttonText="Logout" buttonAction={logOut} /></li>
            </ul>
        </div>
  )
}

export default Navbar
