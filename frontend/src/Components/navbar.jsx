import React, { useContext } from 'react'
import Button from './button'
import { AuthContext } from '../contexts/auth'
import { showToast } from '../services/toastService'

function Navbar (props) {
  const auth = useContext(AuthContext)

  const logOut = () => {
    showToast('See you later', 'info')
    auth.signOut()
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
