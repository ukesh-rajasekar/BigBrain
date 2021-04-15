import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Pages/home';
import Login from './Pages/login'
import Registration from './Pages/registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  React.useEffect(() => {
    <Redirect
            to={{
              pathname: '/login',
              state: { from: '/' }
            }}
          />
  }, [])
  return (
    <Router>
      <div>
      { /*  <nav>
          <ul>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/'>Login</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Registration />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
        <ToastContainer
          position="bottom-right"
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
    </Router>)
}

export default App;
