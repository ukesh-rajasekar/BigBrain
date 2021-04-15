import React, { createContext, useState, useContext } from 'react'
import { BrowserRouter as Route, Redirect, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
ProvideAuth.propTypes = {
  children: PropTypes.any
}

function useAuth () {
  return useContext(AuthContext)
}

function useProvideAuth () {
  // const [user, setUser] = useState(null)
  const [userToken, setUserToken] = useState(null)

  const signin = (data) => {
    const { token } = data
    setUserToken(token)
  }

  const signOut = (cb) => {
    setUserToken(null)
  }

  return {
    userToken,
    signin,
    signOut,
  }
}

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth()
  const loc = useLocation()
  if (auth.userToken) {
    return <Route
    {...rest}
  >
    {children}
  </Route>
  } else {
    return <Redirect to={{
      pathname: '/login',
      state: {
        from: loc
      }
    }} />
  }
}
PrivateRoute.propTypes = {
  children: PropTypes.any
}
