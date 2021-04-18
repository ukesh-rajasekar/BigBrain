import React from 'react'
import Button from './button'
import PropTypes from 'prop-types'

function GameQuestion (props) {
  const { question } = props.question
  const deleteQuestion = () => {
    props.handleDelete(props.index)
  }
  return (
        <div >
          <h3 >Question {props.index + 1}: {question}</h3>
                <Button buttonText='Delete question' buttonAction={deleteQuestion}></Button>
          </div>
  )
}

GameQuestion.propTypes = {
  question: PropTypes.object,
  handleDelete: PropTypes.func,
  index: PropTypes.number
}

export default GameQuestion
