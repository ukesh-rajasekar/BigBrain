import React from 'react'
import PropTypes from 'prop-types'

// Induvidual input for question deatils
function QuestionInput (props) {
  const {
    name,
    handleChange,
    reset,
    type,
    title,
    value,
    questionLabel,
    options,
  } = props
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
            placeholder={title}
            name={name}
            value={value}
            type={type}
            onChange={(e) => handleChange(name, e.target.value)}
          />
          <button onClick={() => reset(name)}>reset</button>
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
          <button onClick={() => reset(name)}>reset</button>
          <br />
          <br />
        </div>
      )
    }
  }
}

QuestionInput.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  reset: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  questionLabel: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
}

export default QuestionInput
