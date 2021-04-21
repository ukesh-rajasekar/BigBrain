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
import {Login} from "./pages/Login";
// import {Home} from "./pages/Home";
import Results from "./pages/Results";
// import Playjoin from "./pages/Playjoin";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import GameDetails from "./pages/GameDetails";
import { getQuestionFromIds } from "./services/Admin/gamehelper";
import EditQuestion from "./components/game/editQuestion";
import { Home } from "./pages/Home";
import Play from "./pages/Play";
import PageNotFound from "./components/PageNotFound";
import Game from "./pages/Game";
import UploadGame from "./pages/UploadGame";

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
          <Route exact path="/home">
            <Home />
          </Route>
          <PrivateRoute exact path="/admin">
            <AdminDashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/uploadGame">
            <UploadGame />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/:gameId">
            <GameDetails />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/:gameId/:quesId">
            <EditQuestion />
          </PrivateRoute>
          <PrivateRoute path="/admin/:gameId/:sessionId/results">
            <Results />
          </PrivateRoute>
          <Route exact path="/play">
            <Play />
          </Route>
          <Route exact path="/play/:playerName/:sessionId">
            <Game />
          </Route>
          <Route path="/*">
            <PageNotFound />
          </Route>
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
const PlayerResult = () => {
  return (
    <React.Fragment>
      <h1>PlayerResult </h1>
    </React.Fragment>
  );
};



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
