import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Authenticator } from '../contexts/Auth';
import { registerAdmin } from '../services/Auth/authServices';
import Input from '../components/Input'
import Button from '../components/button'
import { Card, Row, Container, Col } from 'react-bootstrap'
import { showToast } from '../services/toastServices';
import NavbarPlayers from '../components/navBarPlayers';

const Register = () => {
  const history = useHistory(); // let auth = useAuth();
  const [formValues, setForm] = useState({ email: '', password: '', name: '' });
  const auth = useContext(Authenticator);
  console.log(history);

  const setStateValue = (item, value) => {
    setForm({ ...formValues, [item]: value });
  };
  const onsubmit = () => {
    console.log(history);
    registerAdmin(formValues).then((data) => {
      if (data?.token) {
        auth.signUp(data);
        showToast('Signed up Successfully', 'success')
        history.push('/admin')
      } else {
        showToast('Failed to sign up', 'error')
      }
    });
  };
  return (
    <Container fluid="md">
        <NavbarPlayers></NavbarPlayers>

      <Row className="justify-content-md-center">
        <Col>
      <Card className=' text-center'
        bg={'light'}>
        <Card.Body className='container'>
          <Card.Header>Welcome to the Club, Please Register</Card.Header>
          <Input
            name="name"
            placeholder="name"
            className="name"
            type="text"
            handleChange={setStateValue}
          />
          <Input
            name="email"
            placeholder="Email"
            className="email"
            type="text"
            handleChange={setStateValue}
          />
          <Input
            name="password"
            placeholder="Password"
            className="password"
            type="password"
            handleChange={setStateValue}
          />
          <Button
            buttonText="Signup"
            buttonAction={() => onsubmit(history)}
          />
          <Button
            buttonText="Log In"
            buttonAction={() => history.push('/login')}
          />
         </Card.Body>
          </Card >
          </Col>
     </Row>
</Container>
  );
};

export default Register
