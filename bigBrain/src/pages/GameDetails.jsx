import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  deleteGameById,
  updateGameQuestions,
} from "../services/Admin/gamehelper";
import { getCopy } from "../services/helpers";
import GameQuestion from "../components/game/gameQuestions";
import Modal from "react-modal";
import { fetchQuizData } from "../services/games/gameService";
import Button from "../components/button";
import Input from "../components/Input";
import PageNotFound from "../components/PageNotFound";
import { questionFormat } from "../constants/questionFormat";
import { v4 as uuidv4 } from "uuid";

function GameDetails() {
  console.log("rendering");
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [name] = useState("");
  const history = useHistory();
  let subtitle;
  const [newQuestions, setnewQuestions] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    fetchQuizData(gameId).then((gameData) => {
      if (gameData) {
        setGameData(gameData);
        if (gameData?.questions?.length !== 0) {
          console.log(getCopy(gameData.questions));
          setnewQuestions(getCopy(gameData.questions));
        }
      }
    });
    return () => {};
  }, [gameId]);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleNewQuestionChange = (item, value) => {
    setNewQuestion(value);
  };
  const addQuestion = () => {
    let newQues = getCopy(questionFormat);
    console.log(uuidv4());
    newQues.id = uuidv4();
    newQues.question.value = newQuestion;

    updateGameQuestions(gameId, {
      questions: [...newQuestions, newQues],
      name: name,
      thumbnail: "",
    }).then((data) => {
      if (JSON.stringify(data) === "{}") {
        console.log(newQuestions);
        console.log(newQues);
        setnewQuestions([...newQuestions, newQues]);
      }
    });
  };

  const deleteQuestionOfIdx = (idx) => {
    const temp = getCopy(newQuestions);
    temp.splice(idx, 1);
    updateGameQuestions(gameId, {
      questions: temp,
      name: name,
      thumbnail: "",
    }).then((data) => {
      if (JSON.stringify(data) === "{}") {
        setnewQuestions(getCopy(temp));
      }
    });
  };

  const deleteGame = () => {
    deleteGameById(gameId).then((data) => {
      if (JSON.stringify(data) === "{}") {
        history.push("/admin");
      }
    });
  };
  console.log("gameDetails", gameId);
  console.log("gameDetails", newQuestions);
  console.log(gameData);
  if (!gameData) return <PageNotFound />;
  return (
    <div className="gameWrapper">
      {/* GAME details */}
      <div className="gameContainer">
        <h3>{gameData.name}</h3>
        {newQuestions.map((question, idx) => {
          return (
              <div key={ idx}>
              <GameQuestion
                key={idx}
                      question={question}
                      quesId = {question.id}
                        index={idx}
                  />
                   <Button
        buttonText="Delete question"
        buttonAction={()=>deleteQuestionOfIdx(idx)}
                  ></Button>
                 
            </div>
          );
        })}
        <Button buttonText="Create question" buttonAction={openModal}></Button>
        <Button buttonText="Delete game" buttonAction={deleteGame}></Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Your Question</h2>
          <form>
            <Input
              name="question"
              placeholder="Enter the question"
              className="addQuestionQuestion"
              type="text"
              handleChange={handleNewQuestionChange}
            />
          </form>
          <Button buttonText="Add Question" buttonAction={addQuestion}></Button>
          <Button buttonText="close" buttonAction={closeModal}></Button>
        </Modal>
      </div>
    </div>
  );
}

export default GameDetails;