import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Authenticator } from "../contexts/Auth";
import { registerAdmin } from "../services/Auth/authServices";
import Input from '../components/Input'
import Button from '../components/button'
const Register = () => {
  const history = useHistory(); // let auth = useAuth();
  const [formValues, setForm] = useState({ email: "", password: "", name: "" });
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
        history.push('/admin')
      } else {
        alert(data.error)
      }
    });
  };
  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="container">
          <p className="header">Welcome</p>
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
            buttonText="Register"
            buttonAction={() => onsubmit(history)}
          />
          <Button
            buttonText="Log In"
            buttonAction={() => history.push("/login")}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register