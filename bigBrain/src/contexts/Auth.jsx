import React, { createContext, useState } from "react";

export const Authenticator = createContext();

export function AuthContext({ children }) {
  const auth = SetAuthValues();

  return (
    <Authenticator.Provider value={auth}>{children}</Authenticator.Provider>
  );
}

function SetAuthValues() {
  const [authToken, setAuthtoken] = useState(false);
  const signIn = (data) => {
    const { token } = data;
    setAuthtoken(token);
  };

  const signUp = (data) => {
    const { token } = data;
    setAuthtoken(token);
  };

  const logOut = () => {
    setAuthtoken(false);
  };
  return {
    authToken,
    signIn,
    signUp,
    logOut,
  };
}
