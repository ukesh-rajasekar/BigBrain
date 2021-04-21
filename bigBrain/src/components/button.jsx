import React from 'react'
import PropTypes from 'prop-types'
import {Button as Btn} from 'react-bootstrap';

function Button ({ name, buttonText, buttonAction, ...rest }) {
  return (
        <Btn name = {name} onClick = {buttonAction} {...rest}>{buttonText}  </Btn>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func
}

export default Button
