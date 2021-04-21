import React, { useContext, useState } from 'react'

import { useHistory } from 'react-router';
import Input from '../components/Input'
import Button from '../components/button'
import { Authenticator } from '../contexts/Auth';
import { loginAdmin } from "../services/Auth/authServices";
import showtoast from "../services/toastServices"
const Login = () => {
  const history = useHistory();
    const auth = useContext(Authenticator);
      const [formValues, setForm] = useState({ email: '', password: '' })
      const setStateValue = (item, value) => {
    setForm({ ...formValues, [item]: value })
    }
    
  const onsubmit = () => {
  loginAdmin(formValues).then((data) => {
      if (data?.token) {
        auth.signIn(data);
        history.push('/admin')
      } else {
        alert(data.error)
      }
    });
  }

  const validateInput = (str = "") => {
    str.includes('@');
  }
  return (
    <React.Fragment>
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
            {formValues.email && !validateInput(formValues.email) ? <p>Invalid email !</p> : null}
            <Input
              name='password'
              placeholder='Password'
              className='password'
              type='password'
              handleChange={setStateValue}
            />
            <Button buttonText='Log In' buttonAction={onsubmit} />
            <Button buttonText='sign Up' buttonAction={() => history.push('/register')} />
          </div>
        </div>
    </React.Fragment>
  );
};


export default Login

