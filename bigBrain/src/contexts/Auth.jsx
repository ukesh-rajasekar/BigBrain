import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Authenticator = createContext();

export function AuthContext ({ children }) {
  const auth = SetAuthValues();

  return (
    <Authenticator.Provider value={auth}>{children}</Authenticator.Provider>
  );
}

function SetAuthValues () {
  const [authToken, setAuthtoken] = useState(
    false || sessionStorage.getItem('Token')
  );
  const signIn = (data) => {
    const { token } = data;
    setAuthtoken(token);
    sessionStorage.setItem('Token', token);
    console.log(sessionStorage);
  };

  const signUp = (data) => {
    const { token } = data;
    setAuthtoken(token);
    sessionStorage.setItem('Token', token);
    console.log(sessionStorage);
  };

  const logOut = () => {
    setAuthtoken(false);
    sessionStorage.removeItem('Token');
    console.log(sessionStorage);
  };
  return {
    authToken,
    signIn,
    signUp,
    logOut,
  };
}

AuthContext.propTypes = {
  children: PropTypes.any,
};
