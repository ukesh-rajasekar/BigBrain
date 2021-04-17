import React from 'react'
import PropTypes from 'prop-types'

function Button ({ buttonText, buttonAction }) {
  return (
        <button onClick = {buttonAction}>{buttonText}</button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func
}

export default Button
