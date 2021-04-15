import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './Pages/home'
import Login from './Pages/login'
import Registration from './Pages/registration'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProvideAuth, PrivateRoute } from './contexts/auth'
import { RouterService } from './services/routingService'

function App () {
  return (
    <Router>
      <RouterService>

            <ProvideAuth>

        <div>
          <ul>
            <li>
              <Link to="/login">Public Page</Link>
            </li>
            <li>
              <Link to="/home">Protected Page</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Registration />
            </Route>
            <PrivateRoute exact path="/home">
              <Home />
            </PrivateRoute>
          </Switch>
          <ToastContainer
            position='bottom-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>

        </ProvideAuth>
        </RouterService>
      </Router>
  )
}

export default App
