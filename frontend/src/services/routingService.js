import React from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'

export const RouteContext = React.createContext()

// function useRouter () {
//   return React.useContext(RouteContext)
// }

export const RouterService = ({ children }) => {
  const route = useRouterFunc()
  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>
}
RouterService.propTypes = {
  children: PropTypes.any
}

function useRouterFunc () {
  const history = useHistory()
  const redirectTo = (path) => {
    console.log(path)
    history.push(path)
  }

  return { redirectTo }
}
