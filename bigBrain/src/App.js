import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext, Authenticator } from "./contexts/Auth";
import Register from "./pages/registration";
import Login from "./pages/Login";
import {Home} from "./pages/Home";
import Results from "./pages/Results";
import Playjoin from "./pages/Playjoin";

function App() {
  return (
    <AuthContext>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/dashboard">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/:gameId">
            <GameDetails />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/:gameId/:quesId">
            <QuestionDetails />
          </PrivateRoute>
          <PrivateRoute path="/dashboard/session/:sessionId/results">
            <Results />
          </PrivateRoute>
          <PrivateRoute path="/play/join/:sessionid">
            <Playjoin />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthContext>
  );
}
// const Home = () => {
//   return (
//     <React.Fragment>
//       <h1>Home</h1>
//     </React.Fragment>
//   );
// };


const Dashboard = () => {
  const history = useHistory(); // let auth = useAuth();
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          history.push("/dashboard/123");
        }}
      >
        {" "}
        HI
      </button>
    </React.Fragment>
  );
};
const GameDetails = () => {
  const history = useHistory(); // let auth = useAuth();

  return (
    <React.Fragment>
      <h1>GameDetails</h1>
      <button onClick={() => history.push("/dashboard/123/1234")}> HI</button>
    </React.Fragment>
  );
};

const QuestionDetails = () => {
  const history = useHistory(); // let auth = useAuth();

  return (
    <React.Fragment>
      <h1>QuestionDetails</h1>
      <button onClick={() => history.push("/login")}> HI</button>
    </React.Fragment>
  );
};

function PrivateRoute({ children, ...rest }) {
  const auth = useContext(Authenticator);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
