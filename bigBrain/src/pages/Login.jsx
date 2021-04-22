import React, { useContext, useState } from 'react'

import { useHistory } from 'react-router';
import Input from '../components/Input'
import Button from '../components/button'
import { Authenticator } from '../contexts/Auth';
import { loginAdmin } from '../services/Auth/authServices';
import './styles/login.css';
import { Card, Row, Container, Col } from 'react-bootstrap'
import NavbarPlayers from '../components/navBarPlayers';

export const validateInput = (str = '') => {
  return str.includes('@');
}

export const Login = () => {
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

  return (
    <Container fluid="md">
        <NavbarPlayers></NavbarPlayers>

      <Row className="justify-content-md-center">
        <Col>
      <Card className=' text-center'
        bg={'light'}>
        <Card.Body className='container'>
          <Card.Header>Hello BigBrains, please log in</Card.Header>
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
            <Button name='login' buttonText='Log In' buttonAction={onsubmit} />
            <Button name='signup' buttonText='Sign Up' buttonAction={() => history.push('/register')} />
          </Card.Body>
          </Card >
          </Col>
     </Row>
</Container>
  );
};
