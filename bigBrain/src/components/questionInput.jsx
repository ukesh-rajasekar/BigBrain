import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './button'
import { showToast } from '../services/toastServices'
import { v4 as uuidv4 } from "uuid";
import { getCopy } from '../services/helpers';

// Induvidual input for question deatils
function QuestionInput (props) {
  const {
    name,
    handleChange,
    reset,
    type,
    placeholder,
    value,
    questionLabel,
    options,
  } = props
  console.log((name,value));
  switch (type) {
    // Case for normal string inputs
    case 'text': {
      return (
        <div className='questionContainer'>
          <label className='questionLabel' htmlFor='question'>
            {questionLabel}
          </label>
          <br />
          <input
            placeholder={value || placeholder}
            name={name}
            value={value}
            type={type}
            onChange={(e) => handleChange(name, e.target.value)}
          />
          {/* <button onClick={() => reset(name)}>reset</button> */}
          <br />
          <br />
        </div>
      )
    }
    // Case for option inputs
    case 'options': {
      return (
        <div className='questionContainer'>
          <label className='questionLabel' htmlFor='question'>
            {questionLabel}
          </label>
          <br />
          <select
            value={value}
            name={name}
            id={name}
            onChange={(e) => handleChange(name, e.target.value)}
          >
            {/* //Mapping through the options values provided */}
            {options.map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            })}
          </select>
          {/* <button onClick={() => reset(name)}>reset</button> */}
          <br />
          <br />
        </div>
      )
    }
    case 'answer': {
      return (
        <div className='questionContainer'>
          <label className='questionLabel' htmlFor='question'>
            {questionLabel}
          </label>
          <br />
          
          <Answer answers={value}  handleChange={(name, ItemValue)=> handleChange(name, ItemValue)} />
          {/* <button onClick={() => reset(name)}>reset</button> */}
          <br />
          <br />
        </div>
      )
      }
      default:
          return null
  }
}

QuestionInput.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  reset: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  questionLabel: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string , PropTypes.array]),
  options: PropTypes.array,
}

export default QuestionInput



const Answer = ({ answers, handleChange }) => {
  const [currentAnswers, setcurrentAnswers] = useState(answers)
  const [newAnswers, setnewAnswers] = useState(answers)
  const [newAnswer, setnewAnswer] = useState("")
  
  
  useEffect(() => {
    console.log('annswers changed');
    handleChange('answer',newAnswers)
    
  }, [newAnswers])
  const handleValueChange = (type,value) => {
    switch (type) {
      case "choice":
        setnewAnswer(value)
        break
      case "checkbox":
        console.log(value);
        const [idx, newValue] = value
        console.log(idx,Boolean(newValue));
        const editedanswers = getCopy(newAnswers)
        editedanswers[idx].isCorrectAnswer = newValue
        setnewAnswers(editedanswers)
        break
      default:
        return null
    }
  }

  const handleAdd = () => {
    if (newAnswers.length < 6)
      
    {
      const answerObj = {
        id: uuidv4(),
        answer: newAnswer,
        isCorrectAnswer: false
    }
      setnewAnswers([...newAnswers, answerObj])
      

    } else {
      showToast("maximum allowed number of answers is 6", "error")
    }
  }

  const handleRemove = (idx) => {
    const editedanswers = getCopy(newAnswers)
    editedanswers.splice(idx, 1)
    setnewAnswers(editedanswers)
  }
  return <div>
    {newAnswers.map((value, idx) => {
      return <div key={ idx}><h3>{value.answer}</h3>
    <Button name="removeAnswer" variant="danger" buttonText="remove answer" buttonAction={() => handleRemove(idx)} />
        <input type="checkbox" name="isCorrectAnswer" checked={value.isCorrectAnswer} onChange={(e)=> handleValueChange("checkbox", [idx, e.target.checked])}/>
      <label htmlFor="isCorrectAnswer"> Is it a right answer?</label><br></br>
      </div>
    })}
    <input
            name="addAnswer"
            placeholder="Enter the answer here"
            value={newAnswer}
            type="text"
            onChange={(e) => handleValueChange("choice", e.target.value)}
    />
    
    <Button name="addAnswer" buttonText="Add answer" buttonAction={() => handleAdd()} />
  </div>
}