import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useRouteMatch } from 'react-router';
import Button from '../button';
import Card from 'react-bootstrap/Card'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import { urls } from '../../constants/urls';
import { showToast } from '../../services/toastServices';
import { doGet, doPost } from '../../services/apiRequests';
import Popup from '../popups';

function GameCards (props) {
  const { gameData } = props
  const [sessionId, setSessionId] = useState(null);
  const [sessionStatus, setSessionStatus] = useState('inactive');
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionClose, setSessionClose] = useState(false);
   
  const id = gameData.id
    const history = useHistory()
    const {path} = useRouteMatch()
    console.log(path);

    


const onstart = (gameId) => {
  // setQuizId(gameId)
  doPost(urls.gameSession + `/${gameId}/start`).then((res) => {
    if (res.status === 200) {
      console.log("created");
      showToast(`Game started`, "success");
      doGet(urls.gameSession + `/${gameId}`).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setSessionId(data.active);
            setSessionStatus("active")
            setSessionOpen(true);
          });
        }
      });
      setSessionStatus("inactive");
    } else {
      //console.log('Invalid request')
      showToast("Game cannot be created", "error");
    }
  });
};
const onadvance = (gameId) => {
  doPost(`${urls.gameSession}/${gameId}/advance`).then((res)=> {
    if (res.status === 200) {
      console.log("Advancing to next question");
      showToast(`Game Advanced`, "info");
    } else {
      showToast('Game Ended', 'info')
      setSessionStatus("ended");
      setSessionClose(true);
    }
  })
}
const onend = (gameId) => {
  doPost(urls.gameSession + `/${gameId}/end`).then((res) => {
    if (res.status === 200) {
      console.log("ended");
      showToast(`Game ended`, "success");
      setSessionStatus("ended");
      setSessionClose(true);
    } else {
      //console.log('Invalid request')
      setSessionStatus("ended");
      showToast("You have already ended the game", "error");
    }
  });
};

const gotoresults = (sessionId, quizId) => {
  setSessionClose(false);
  history.push(`/admin/${quizId}/${sessionId}/results`);
};
  return (
    <div className="wrapper">
            <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={base64Example} />
        <Card.Body>
          <Card.Title>{gameData.name}</Card.Title>
          </Card.Body>
          {/* <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text> */}
          <ListGroup className="list-group-flush">
    <ListGroupItem>Game no of Questions :{gameData?.questions?.length}</ListGroupItem>
    <ListGroupItem> Approximate time taken to complete is {gameData?.questions?.length * 50} sec</ListGroupItem>
  </ListGroup>
  <Card.Body>
          <Button variant="primary" buttonText="Edit Game" buttonAction={() => history.push(`${path}/${id}`)}/>
          </Card.Body>
          <Card.Body>
          <ListGroup className="list-group-flush">
    <ListGroupItem>
      <Button variant="success" name = {gameData.name} buttonText = 'Start game' buttonAction = {()=> onstart(gameData.id)} />
              <Button variant="danger" name = {gameData.name} buttonText = 'End game' buttonAction = {()=> onend (gameData.id)} />
              { sessionStatus==="active" && <Button buttonText = 'Advance game' buttonAction = {()=> onadvance(gameData.id)} />}
              </ListGroupItem>
    <ListGroupItem> {sessionStatus==="active" && sessionOpen && (<Card.Body>
                <Popup
                content={()=>
                  <>
                    <b>ID: {sessionId}</b>
                    <Button
                    name = 'copylink'
                      buttonText="Copy session link"
                      buttonAction={() =>
                        navigator.clipboard.writeText(sessionId)
                      }
                    />
                  </>
                }
                handleClose={() => setSessionOpen(false)}
              />
               </Card.Body>)}
               {sessionStatus==="ended" && sessionOpen && (
            <Popup
              content={()=>
                <div>
                  <b>Would you like to view the results?</b>
                  <Button
                  name='yes'
                    buttonText="Yes"
                    buttonAction={() => {
                      gotoresults(sessionId, gameData.id);
                    }}
                  />
                  <Button
                  name='no'
                    buttonText="No"
                    buttonAction={() => {
                      setSessionOpen(false);
                    }}
                  />
                </div>
              }
              handleClose={() =>             setSessionOpen(false)}
            />
          )}
          </ListGroupItem>
  </ListGroup>
          </Card.Body>
      </Card>
      <br/>
        </div>
  )

  
}

GameCards.propTypes = {
  index: PropTypes.string,
  gameData: PropTypes.object,
  handleDelete: PropTypes.func,
  url: PropTypes.string
}

export default GameCards

const base64Example = 'data:image/gif;base64,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'
