import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import QuestionInput from '../Components/questionInput'
import Button from '../Components/button'

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
  answer: {
    name: 'answer',
    type: 'text',
    title: '',
    questionLabel: 'Enter the answer',
    value: '',
    constrains: {
      length: {
        min: 2,
        max: 6
      }
    }
  },
}

// Generate new deep copy of the object
const getNewObject = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const EditQuestion = (props) => {
  const { gameId = 0, questionId = 0, questionDetails = defaultDetails } = props
  const [newDetails, setNewDetails] = useState(getNewObject(questionDetails))
  const [currentDetails, setCurrentDetails] = useState(
    getNewObject(defaultDetails)
  )

  // Set the initial value for resetting if needed
  useEffect(() => {
    setCurrentDetails(Object.assign({}, questionDetails))
  }, [])

  // Update the details when user chages the values
  const handleChange = (item, value) => {
    const tempDetails = { ...newDetails }
    if (tempDetails[item]?.constrains?.length) {
      const { max } = tempDetails[item]?.constrains?.length
      if (value.length > max) return
    }
    tempDetails[item].value = value
    setNewDetails({ ...getNewObject(tempDetails) })
  }
  const handleSave = () => {
    console.log(newDetails);
    const answer = newDetails.answer
    const { min, max } = answer?.constrains?.length
    if (answer.value.length > max || answer.value.length < min) { alert('Answer should be of length between 2 and 6 character') } else {
      saveChanges(newDetails)
    }
  }

  const saveChanges = (data) => {
    console.log('save changes');
    return null
  }

  // Reset the item specified
  const reset = (item) => {
    const tempDetails = { ...newDetails }
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
            return (
              <QuestionInput
                key={key}
                {...value}
                handleChange={handleChange}
                reset={reset}
              />
            )
          })}
            <Button buttonText="Save changes" buttonAction={() => handleSave()} />
        </div>
      </div>
    </div>
  )
}

EditQuestion.propTypes = {
  gameId: PropTypes.string,
  questionId: PropTypes.string,
  questionDetails: PropTypes.object,
  saveChanges: PropTypes.func
}

export default EditQuestion
