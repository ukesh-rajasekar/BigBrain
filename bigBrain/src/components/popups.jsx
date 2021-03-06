import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Popup = (props) => {
  return (
    <Card.Body>
      <Card.Text>{props.content()}</Card.Text>
    </Card.Body>
  );
};

export default Popup;

Popup.propTypes = {
  content: PropTypes.any,
};
