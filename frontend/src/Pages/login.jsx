import React, { useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/button'
import { doPost } from '../services/apiService'
import { urls } from '../services/links'
import { showToast } from '../services/toastService'

// import { Redirect } from 'react-router-dom';

const Login = () => {
  const [formValues, setForm] = useState({ email: '', password: '' })

  const setStateValue = (item, value) => {
    setForm({ ...formValues, [item]: value })
  }

  const onsubmit = () => {
    doPost(urls.login, formValues).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          showToast('login Success', 'success')
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
            <Button buttonText='Login' buttonAction={onsubmit} />
          </div>
        </div>
  )
}

export default Login
