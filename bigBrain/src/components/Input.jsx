import React from 'react'
import PropTypes from 'prop-types'

function Input ({ name, placeholder, className, type, handleChange }) {
  return (
        <input name={name} placeholder= {placeholder} className= {className} type={type} onChange = {(e) => handleChange(name, e.target.value)}/>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  handleChange: PropTypes.func

}

export default Input
