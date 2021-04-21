import React, { useEffect, useState } from "react";
import Button from "../components/button";
import GameCards from "../components/game/gameCard";
import Input from "../components/Input";
import Navbar from "../components/navBar";
import { oncreate } from "../services/Admin/games";
import {
  fetchAllGames,
  fetchAllGamesByIds,
} from "../services/games/gameService";
function AdminDashboard(props) {
    const [games, setGames] = useState({});
  const [gameObj, setGameObj] = useState({ name: "" });

  const [newGame, setNewGame] = useState(false);
    
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
    const setStateValue = (item, value) => {
        console.log(item,value);
    setGameObj({ ...gameObj, [item]: value });
  };

  useEffect(() => {
      fetchGames()
    return () => {};
  }, [gameObj]);
  return (
    <React.Fragment>
      <Navbar></Navbar>
          <h1 className = 'dashboard-title'>Dashboard</h1>
          <div>
              <div>
                <Button
                  name = 'createGame'
                  buttonText={!newGame?"create game": " Cancel "}
                  buttonAction={() => setNewGame(!newGame)}
                />
              </div>

        {newGame && (
          <Input
            name="name"
            placeholder="Enter the game`s name"
            className="new-game"
            type="text"
            handleChange={setStateValue}
          />
        )}
      </div>
      <div>
        {newGame && <Button name='confirmGame' buttonText="Submit" buttonAction={()=>oncreate(gameObj).then(()=> fetchGames())} />}
      </div>
      {Object.entries(games).map(([idx,gameData]) => {
            return (
                <GameCards key={gameData.id} gameData= {gameData} />
            )
          })}
    </React.Fragment>
  );
}
export default AdminDashboard;
