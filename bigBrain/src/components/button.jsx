import React from 'react';
import PropTypes from 'prop-types';
import { Button as Btn } from 'react-bootstrap';

function Button ({ name, buttonText, buttonAction, ...rest }) {
  return (
    <Btn size="sm" name={name} onClick={buttonAction} {...rest}>
      {buttonText}{' '}
    </Btn>
  );
}

Button.propTypes = {
  buttonText: PropTypes.any,
  buttonAction: PropTypes.func,
  name: PropTypes.string,
};

export default Button;
