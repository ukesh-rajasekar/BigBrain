import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  deleteGameById,
  updateGameQuestions,
} from '../services/Admin/gamehelper';
import { getCopy } from '../services/helpers';
import GameQuestion from '../components/game/gameQuestions';
import Modal from 'react-modal';
import { fetchQuizData } from '../services/games/gameService';
import Button from '../components/button';
import Input from '../components/Input';
import PageNotFound from '../components/PageNotFound';
import { questionFormat } from '../constants/questionFormat';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/navBar';

function GameDetails () {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [name] = useState('');
  const history = useHistory();
  let subtitle;
  const [newQuestions, setnewQuestions] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    fetchQuizData(gameId).then((gameData) => {
      if (gameData) {
        setGameData(gameData);
        if (gameData?.questions?.length !== 0) {
          setnewQuestions(getCopy(gameData.questions));
        }
      }
    });
    return () => {};
  }, [gameId]);

  function openModal () {
    setIsOpen(true);
  }
  function afterOpenModal () {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal () {
    setIsOpen(false);
  }
  const handleNewQuestionChange = (item, value) => {
    setNewQuestion(value);
  };
  const addQuestion = () => {
    const newQues = getCopy(questionFormat);
    newQues.id = uuidv4();
    newQues.question.value = newQuestion;

    updateGameQuestions(gameId, {
      questions: [...newQuestions, newQues],
      name: name,
      thumbnail: '',
    }).then((data) => {
      if (JSON.stringify(data) === '{}') {
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
      thumbnail: '',
    }).then((data) => {
      if (JSON.stringify(data) === '{}') {
        setnewQuestions(getCopy(temp));
      }
    });
  };

  const deleteGame = () => {
    deleteGameById(gameId).then((data) => {
      if (JSON.stringify(data) === '{}') {
        history.push('/admin');
      }
    });
  };
  if (!gameData) return <PageNotFound />;
  return (
    <div className="gameWrapper">
            <Navbar></Navbar>

      <div className="gameContainer">
        <h3>{gameData.name}</h3>
        {newQuestions.map((question, idx) => {
          return (
              <div key={ idx}>
              <GameQuestion
                key={idx}
                question={question}
                quesId={question.id}
                index={idx}
                handleDelete={deleteQuestionOfIdx}
                  />

            </div>
          );
        })}
        <Button name="createQuestion" buttonText="Create question" buttonAction={openModal}></Button>
        <Button name="deleteGame" variant="danger" buttonText="Delete game" buttonAction={deleteGame}></Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
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
          <Button name="addQuestion" buttonText="Add Question" buttonAction={addQuestion}></Button>
          <Button name="closeQuestion" buttonText="close" buttonAction={closeModal}></Button>
        </Modal>
      </div>
    </div>
  );
}

export default GameDetails;
