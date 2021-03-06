import React, { useState, useContext } from 'react'
import Input from '../Components/Input'
import Button from '../Components/button'
import { doPost } from '../services/apiService'
import { urls } from '../services/links'
import { showToast } from '../services/toastService'
import { AuthContext } from '../contexts/auth'
import { RouteContext } from '../services/routingService'
// import { Redirect, useLocation, withRouter } from 'react-router'

export const Login = () => {
  const [formValues, setForm] = useState({ email: '', password: '' })
  // const loc = useLocation()
  const auth = useContext(AuthContext)
  const route = useContext(RouteContext)
  // const history = useHistory()
  const setStateValue = (item, value) => {
    setForm({ ...formValues, [item]: value })
  }

  const onsubmit = () => {
    doPost(urls.login, formValues).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          showToast('login Success', 'success')
          console.log(sessionStorage)
          console.log(data)
          auth.signin(data)
          route.redirectTo('/home')
        })
      } else {
        showToast('Invalid input', 'error')
      }
    })
  }

  return (
        <div className='wrapper'>
          <div className='container'>
            <p className='header'>Welcome</p>
            <Input
              name='email'
              placeholder='Email'
              className='email'
              type='text'
              handleChange={setStateValue}
            />
            <Input
              name='password'
              placeholder='Password'
              className='password'
              type='password'
              handleChange={setStateValue}
            />
            <Button buttonText='Log In' buttonAction={onsubmit} />
            <Button buttonText='sign Up' buttonAction={() => route.redirectTo('/register')} />
          </div>
        </div>
  )
}

// export default Login
