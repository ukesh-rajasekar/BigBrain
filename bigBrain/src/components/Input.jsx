import React from 'react'
import PropTypes from 'prop-types'
import FormControl from 'react-bootstrap/FormControl';

function Input ({ name, placeholder, className, type, handleChange }) {
  return (
     
        <FormControl name={name} placeholder= {placeholder} className= {className} type={type} onChange = {(e) => handleChange(name, e.target.value)}/>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  handleChange: PropTypes.func

}
Input.defaultProps = {
  type: 'text',
};

export default Input
