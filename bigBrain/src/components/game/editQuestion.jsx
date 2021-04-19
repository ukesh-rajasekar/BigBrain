import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../button'
import QuestionInput from '../questionInput'
import { getCopy } from '../../services/helpers'
import { useParams } from 'react-router'
import { getQuestionFromIds, updateGameQuestionOfId } from '../../services/Admin/gamehelper'

const defaultDetails = {
  question: {
    name: 'question',
    type: 'text',
    title: 'How old are you',
    questionLabel: 'Question',
    value: '',
  },
  type: {
    name: 'type',
    type: 'options',
    title: 'single-choice',
    questionLabel: 'Choode the type of question',
    value: '',
    options: ['single-choice', 'multiple-choice'],
  },
  timeLimit: {
    name: 'timeLimit',
    type: 'text',
    title: '10000',
    questionLabel: 'Enter the time limit',
    value: '',
  },
  points: {
    name: 'points',
    type: 'text',
    title: '50',
    questionLabel: 'Enter the point',
    value: '',
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
    type: 'options',
    title: '',
      questionLabel: 'Enter the answer',
    options: ['single-choice', 'multiple-choice'],
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
    const {  questionId = 0 } = props
    const { gameId, quesId } = useParams()
    console.log(gameId, quesId);
    const [questionDetails, setQuestionDetails] = useState({})
    const [newDetails, setNewDetails] = useState({})
  const [currentDetails, setCurrentDetails] = useState(
    getNewObject(defaultDetails)
  )

  // Set the initial value for resetting if needed
    useEffect(() => {
      getQuestionFromIds(gameId, quesId).then((value) => {
          console.log(value);
          setQuestionDetails(getCopy(value))
          setNewDetails(getCopy(value))
  })
    setCurrentDetails(Object.assign({}, questionDetails))
  }, [gameId,quesId])

  // Update the details when user chages the values
    const handleChange = (item, value) => {
      console.log(item,value);
    const tempDetails = getCopy(newDetails)
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
        updateGameQuestionOfId(gameId, quesId, data).then((data) => {
          console.log(data);
      })
    console.log('save changes', data);
    return null
  }

  // Reset the item specified
    const reset = (item) => {
      console.log(item)
    const tempDetails = { ...newDetails }
    tempDetails[item].value = currentDetails[item].value
    setNewDetails({ ...getNewObject(tempDetails) })
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <h3>Edit Question</h3>
        <h4>GameId: {gameId}</h4>
        <h4>questionId: {quesId}</h4>
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
}

export default EditQuestion
