import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './button'
import Modal from 'react-modal'
import Input from './Input'
import GameQuestion from './gameQuestion'
import { updateGameQuestions, deleteGameById } from '../services/gamesService'

const getCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

function Game (props) {
  const { id, questions, name } = props.gameData
  const { index, handleDelete } = props
  //   console.log(questions)
  let subtitle
  const [newQuestions, setnewQuestions] = useState([...getCopy(questions)])
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  function openModal () {
    setIsOpen(true)
  }
  function afterOpenModal () {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }
  function closeModal () {
    setIsOpen(false)
  }
  const handleNewQuestionChange = (item, value) => {
    setNewQuestion(value)
  }
  const addQuestion = () => {
    const newQues = {
      question: newQuestion,
    }

    updateGameQuestions(id, {
      questions: [...newQuestions, newQues],
      name: name,
      thumbnail: ''
    }).then((data) => {
      if (JSON.stringify(data) === '{}') {
        setnewQuestions([...newQuestions, newQues])
      }
    })
  }

  const deleteQuestionOfIdx = (idx) => {
    const temp = getCopy(newQuestions)
    temp.splice(idx, 1)
    updateGameQuestions(id, {
      questions: temp,
      name: name,
      thumbnail: ''
    }).then((data) => {
      if (JSON.stringify(data) === '{}') {
        setnewQuestions(getCopy(temp))
      }
    })
  }

  const deleteGame = () => {
    deleteGameById(id).then((data) => {
      if (JSON.stringify(data) === '{}') {
        handleDelete(id, index)
      }
    })
  }
  return (
    <div className='gameWrapper'>
      <div className='gameContainer'>
        <h3>{name}</h3>
        {newQuestions.map((question, idx) => {
          return (
            <GameQuestion
              key={idx}
              question={question}
              index={idx}
              handleDelete={deleteQuestionOfIdx}
            ></GameQuestion>
          )
        })}
        <Button buttonText='Create question' buttonAction={openModal}></Button>
        <Button buttonText='Delete game' buttonAction={deleteGame}></Button>
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
          contentLabel='Example Modal'
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Your Question</h2>
          <form>
            <Input
              name='question'
              placeholder='Enter the question'
              className='addQuestionQuestion'
              type='text'
              handleChange={handleNewQuestionChange}
            />
          </form>
          <Button buttonText='Add Question' buttonAction={addQuestion}></Button>
          <Button buttonText='close' buttonAction={closeModal}></Button>
        </Modal>
      </div>
    </div>
  )
}

Game.propTypes = {
  gameData: PropTypes.object,
  handleDelete: PropTypes.func,
  index: PropTypes.string
}

export default Game
