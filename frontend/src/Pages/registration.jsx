import React, { Component } from 'react'
import Input from '../Components/Input'
import Button from '../Components/button'
import { doPost } from '../services/apiService';
import { urls } from '../services/links';
import { showToast } from '../services/toastService';

export default class Registration extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: ''
    }
    this.setStateValue = this.setStateValue.bind(this)
  }

  onsubmit = () => {
    const { email, password, name } = this.state
    doPost(urls.register, { email: email, password: password, name: name })
      .then((res) => {
        if (res.status === 200) {
          showToast('registration successful', 'success')
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
            <Input name="name" placeholder= "name" className= "name" type="text" handleChange={this.setStateValue}/>
            <Input name="email" placeholder= "Email" className= "email" type="text" handleChange={this.setStateValue}/>
            <Input name="password" placeholder= "Password" className= "password" type="password" handleChange={this.setStateValue}/>
            <Button buttonText="Register" buttonAction={this.onsubmit}/>
        </div>
      </div>
    )
  }
}
