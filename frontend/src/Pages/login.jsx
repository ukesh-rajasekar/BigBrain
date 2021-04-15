import React, { useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/button'
import { doPost } from '../services/apiService'
import { urls } from '../services/links'
import { showToast } from '../services/toastService'

// import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const setStateValue = (item, value) => {
    console.log(item, value)
    switch (item) {
      case 'email':
        setemail(value)
        break
      case 'password':
        setpassword(value)
        break
    }
  }

  const onsubmit = () => {
    console.log(email, password)
    doPost(urls.login, { email: email, password: password }).then((res) => {
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
