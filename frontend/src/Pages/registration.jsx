import React, { useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/button'
import { doPost } from '../services/apiService';
import { urls } from '../services/links';
import { showToast } from '../services/toastService';

const Registration = () => {
  const [formValues, setForm] = useState({ email: '', password: '', name: '' })

  const setStateValue = (item, value) => {
    setForm({ ...formValues, [item]: value })
  }

  const onsubmit = () => {
    doPost(urls.register, formValues)
      .then((res) => {
        if (res.status === 200) {
          showToast('registration successful', 'success')
        } else {
          showToast('Invalid input', 'error')
        }
      }
      )
  }

  return (
      <div className="wrapper">
        <div className="container">
          <p className="header">Welcome</p>
            <Input name="name" placeholder= "name" className= "name" type="text" handleChange={setStateValue}/>
            <Input name="email" placeholder= "Email" className= "email" type="text" handleChange={setStateValue}/>
            <Input name="password" placeholder= "Password" className= "password" type="password" handleChange={setStateValue}/>
            <Button buttonText="Register" buttonAction={onsubmit}/>
        </div>
      </div>
  )
}

export default Registration
