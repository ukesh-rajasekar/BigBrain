import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext, Authenticator } from "./contexts/Auth";
import Register from "./pages/registration";
import Login from "./pages/Login";
// import {Home} from "./pages/Home";
import Results from "./pages/Results";
import Playjoin from "./pages/Playjoin";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import GameDetails from "./pages/GameDetails";
import { getQuestionFromIds } from "./services/Admin/gamehelper";
import EditQuestion from "./components/game/editQuestion";

function App() {
  console.log(sessionStorage);
  return (
    <AuthContext>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/admin">
            <AdminDashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/:gameId">
            <GameDetails />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/:gameId/:quesId">
            <EditQuestion />
          </PrivateRoute>
          <PrivateRoute path="/admin/session/:sessionId/results">
            <Results />
          </PrivateRoute>
          <PrivateRoute path="/play/join/:sessionid">
            <Playjoin />
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



// const QuestionDetails = () => {
//   const history = useHistory(); // let auth = useAuth();
//   const params = useParams()
//   console.log(params);
  
//   return (
//     <React.Fragment>
//       <h1>QuestionDetails</h1>
//       <button onClick={() => history.push("/login")}> HI</button>
//     </React.Fragment>
//   );
// };

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
