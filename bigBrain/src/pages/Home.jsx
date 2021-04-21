import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Input from "../components/Input";
import Navbar from "../components/navBar";
import Popup from "../components/popups";
import { urls } from "../constants/urls";
import { doPost, doGet } from "../services/apiRequests";
import { showToast } from "../services/toastServices";
import { useHistory } from "react-router";
import {
  fetchAllGames,
  fetchAllGamesByIds,
} from "../services/games/gameService";
import { Link } from "react-router-dom";

// import Navbar from '../Components/navbar'

export const Home = () => {
  const history = useHistory();
  const [games, setGames] = useState({});
  const [quizId, setQuizId] = useState(null);
  const [sessionStatus, setSessionStatus] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionClose, setSessionClose] = useState(false);
  
const fetchGames = () => {
      fetchAllGames().then((data) => {
        if(!data) return
      const ids = [];
      for (const quiz of data?.quizzes) {
        ids.push(quiz.id);
        }
        if (ids.length === 0) return
      fetchAllGamesByIds(ids).then((values) => {
        const games = [];
        let count = 0;
        for (const value of values) {
          let gameDetails = value.value;
          gameDetails = { ...gameDetails, id: ids[count] };
          count = count + 1;
          games.push(gameDetails);
        }
        setGames(games);
      })
    })
  };

  useEffect(() => {
      fetchGames()
    return () => {};
  }, []);




  const onstart = (gameId) => {
    setQuizId(gameId)
    doPost(urls.gameSession + `/${gameId}/start`).then((res) => {
      if (res.status === 200) {
        console.log("created");
        showToast(`Game started`, "success");
        doGet(urls.gameSession + `/${gameId}`).then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              setSessionId(data.active);
              setSessionOpen(true);
            });
          }
        });
        setSessionStatus(!sessionStatus);
      } else {
        //console.log('Invalid request')
        showToast("Game cannot be created", "error");
      }
    });
  };
  const onadvance = (gameId) => {
    doPost(`${urls.gameSession}/${gameId}/advance`).then((res)=> {
      if (res.status === 200) {
        console.log("Advancing");
        showToast(`Game Advanced`, "info");
      } else {
        showToast('Game Ended', 'info')
        setSessionStatus(!sessionStatus);
        setSessionOpen(false);
        setSessionClose(true);
      }
    })
  }
  const onend = (gameId) => {
    doPost(urls.gameSession + `/${gameId}/end`).then((res) => {
      if (res.status === 200) {
        console.log("ended");
        showToast(`Game ended`, "success");
        // doPost(urls.gameSession + '997161454').then((res) => {
        //     if (res.status === 200) {
        //         res.json().then((data) => {
        //             alert(data.active)
        //         })
        //     }
        // })
        setSessionStatus(!sessionStatus);
        setSessionOpen(false);
        setSessionClose(true);
      } else {
        //console.log('Invalid request')
        showToast("You have already ended the game", "error");
      }
    });
  };

  const gotoresults = (sessionId, quizId) => {
    setSessionClose(false);
    console.log(sessionId);
    history.push(`/admin/${quizId}/${sessionId}/results`);
  };

  return (
    <React.Fragment>
      <Navbar />
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
     
      <div>
        <div className="gamesWrapper">
          <div className="gamesContainer">
            {Object.entries(games).map((value) => {
              return <React.Fragment key={value[1].id}><h3 key={value[0]}>{value[1].name}</h3>
              <div>{(<Button buttonText = 'Start game' buttonAction = {()=> onstart(value[1].id)} />)}</div>
              
        <div>{(<Button buttonText = 'End game' buttonAction = {()=> onend (value[1].id)} />)}</div>
              </React.Fragment>
            }) }
          </div>
        </div>

        <div>
          {sessionOpen && (
            <Popup
              content={
                <>
                  <b>Session {sessionId} Started!!!</b>
                  <Button
                    buttonText="Copy session link"
                    buttonAction={() =>
                      navigator.clipboard.writeText(sessionId)
                    }
                  />
                  <div>{(<Button buttonText = 'Advance game' buttonAction = {()=> onadvance(quizId)} />)}</div>
                </>
              }
              handleClose={() => setSessionOpen(false)}
            />
          )}
        </div>

        <div>
          {sessionClose && (
            <Popup
              content={
                <>
                  <b>Would you like to view the results?</b>
                  <Button
                    buttonText="Yes"
                    buttonAction={() => {
                      gotoresults(sessionId, quizId);
                    }}
                  />
                  <Button
                    buttonText="No"
                    buttonAction={() => {
                      setSessionClose(false);
                    }}
                  />
                </>
              }
              handleClose={() => setSessionClose(false)}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
