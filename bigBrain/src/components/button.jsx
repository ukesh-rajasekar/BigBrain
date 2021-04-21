import React from 'react'
import PropTypes from 'prop-types'

function Button ({ name, buttonText, buttonAction }) {
  return (
        <button name = {name} onClick = {buttonAction}>{buttonText}</button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func
}

export default Button
