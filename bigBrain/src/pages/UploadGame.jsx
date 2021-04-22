import React, { useEffect, useState } from 'react';
import { oncreate } from '../services/Admin/games';
import { addQuestions } from '../services/Admin/gamehelper'
import Navbar from '../components/navBar';
import Card from 'react-bootstrap/Card'

export default function UploadGame () {
  const [gameData, setGameData] = useState({});
  const [quizID, setQuizId] = useState(null);
  function setFilePath (event) {
    const reader = new FileReader();
    reader.onload = onFileLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onFileLoad (event) {
    setGameData(JSON.parse(event.target.result));
    //   document.getElementById('fileContent').textContent = event.target.result;
  }

  useEffect(() => {
    if (Object.entries(gameData).length === 0) return null;
    console.log(gameData);
    uploadNewGame(gameData);
    return () => {};
  }, [gameData]);

  const uploadNewGame = (game) => {
    console.log(game.gameName);
    oncreate({
      name: game.gameName,
    }).then((res) => {
      if (res?.quizId) {
        setQuizId(res.quizId);
      }
    });
  };
  useEffect(() => {
    if (!quizID) return null;
    console.log(gameData.Questions);
    addQuestions(quizID, gameData.Questions)
    return () => {};
  }, [quizID]);

  return (
    <div>
      <Navbar></Navbar>
      <Card>
  <Card.Header>Upload Your Game here as .JSON file</Card.Header>
  <Card.Body>
  <input
        name="GameFile"
        placeholder="GameFile"
        className="GameFile"
        type="file"
        onChange={(e) => setFilePath(e)}
      />
  </Card.Body>
</Card>
    </div>
  );
}
