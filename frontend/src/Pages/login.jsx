import React, { Component } from 'react'
import Input from '../Components/Input'
import Button from '../Components/button'
import { doPost } from '../services/apiService';
import { urls } from '../services/links';
import { showToast } from '../services/toastService';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.setStateValue = this.setStateValue.bind(this)
  }

  onsubmit = () => {
    const { email, password } = this.state
    doPost(urls.login, { email: email, password: password })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            <Redirect push to="/home" />

            showToast('login Success', 'success')
          })
        } else {
          showToast('Invalid input', 'error')
        }
      }
      )
  }

  setStateValue (item, value) {
    this.setState((state) => {
      return { [item]: value };
    })
  }

  render () {
    return (
      <div className="wrapper">
        <div className="container">
          <p className="header">Welcome</p>
            <Input name="email" placeholder= "Email" className= "email" type="text" handleChange={this.setStateValue}/>
            <Input name="password" placeholder= "Password" className= "password" type="password" handleChange={this.setStateValue}/>
            <Button buttonText="Login" buttonAction={this.onsubmit}/>
        </div>
      </div>
    )
  }
}
