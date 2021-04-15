import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import QuestionInput from '../Components/questionInput'

const defaultDetails = {
  question: {
    name: 'question',
    type: 'text',
    title: 'How old are you',
    questionLabel: 'Question',
    value: 'How old are you',
  },
  type: {
    name: 'type',
    type: 'options',
    title: 'single-choice',
    questionLabel: 'Choode the type of question',
    value: 'single-choice',
    options: ['single-choice', 'multiple-choice'],
  },
  timeLimit: {
    name: 'timeLimit',
    type: 'text',
    title: '10000',
    questionLabel: 'Enter the time limit',
    value: '10000',
  },
  points: {
    name: 'points',
    type: 'text',
    title: '50',
    questionLabel: 'Enter the point',
    value: '50',
  },
  url: {
    name: 'url',
    type: 'text',
    title: '',
    questionLabel: 'Enter the youtube UR',
    value: '',
  },
}

// Generate new deep copy of the object
const getNewObject = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const EditQuestion = (props) => {
  const { gameId = 0, questionId = 0, questionDetails = defaultDetails } = props

  const [currentDetails, setCurrentDetails] = useState(
    getNewObject(defaultDetails)
  )
  // Set the initial value for resetting if needed
  useEffect(() => {
    setCurrentDetails(Object.assign({}, questionDetails))
  }, [])

  const [newDetails, setNewDetails] = useState(getNewObject(questionDetails))
  // Update the details when user chages the values
  const handleChange = (item, value) => {
    const tempDetails = { ...newDetails }
    tempDetails[item].value = value
    setNewDetails({ ...getNewObject(tempDetails) })
    console.log(currentDetails[item].value)
    console.log(newDetails[item].value)
  }
  // Reset the item specified
  const reset = (item) => {
    const tempDetails = { ...newDetails }
    console.log(currentDetails)
    tempDetails[item].value = currentDetails[item].value

    setNewDetails({ ...getNewObject(tempDetails) })
  }
  return (
    <div className='wrapper'>
      <div className='container'>
        <h3>Edit Question</h3>
        <h4>GameId {gameId}</h4>
        <h4>questionId {questionId}</h4>
        <h3>Question Details</h3>
        <div className='questionDetails'>
          {/* Generate question inputs as needed */}
          {Object.entries(newDetails).map(([key, value]) => {
            console.log(value)
            return (
              <QuestionInput
                key={key}
                {...value}
                handleChange={handleChange}
                reset={reset}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

EditQuestion.propTypes = {
  gameId: PropTypes.string,
  questionId: PropTypes.string,
  questionDetails: PropTypes.object,
}

export default EditQuestion
