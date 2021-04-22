import React from "react";
import { Card } from "react-bootstrap";
 
const Popup = props => {
  return (
  <Card.Body>
    <Card.Subtitle className="mb-2 text-muted">Session Started</Card.Subtitle>
    <Card.Text>
     {props.content()}
    </Card.Text>
  </Card.Body>
        
  );
};
 
export default Popup;