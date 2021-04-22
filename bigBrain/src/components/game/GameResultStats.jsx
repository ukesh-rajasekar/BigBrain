import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchGameResult } from '../../services/games/gameService';
import { getCopy } from '../../services/helpers';
import PropTypes from 'prop-types';
import Button from '../button';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function GameResultStats ({
  questions,
  sessionId,
  showStatusDefault,
}) {
  const [results, setResults] = useState([]);
  const [playersGameStats, setPlayerGameStat] = useState([]);
  const [questionCurrectStats, setQuestionCurrectStats] = useState({});
  const [questionTimeStats, setQuestionTimeStats] = useState({});
  const [showStatus, setshowStatus] = useState(showStatusDefault);

  useEffect(() => {
    fetchGameResult(sessionId).then((result) => {
      setPlayerGameStat([]);
      setResults(result.results);
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (!results?.length) return;
    results.map((playerResult, idx) => {
      return calculalatePlayerPoint(playerResult).then((result) => {
        const temp = playersGameStats;
        temp.push(result);
        setQuestionTimeStats({});
        setQuestionCurrectStats({});
        const newPlayerStats = getCopy([...temp]).sort((a, b) =>
          a.totalPoints < b.totalPoints ? 1 : -1
        );
        setPlayerGameStat(newPlayerStats);
        //  evaluateQuestionStats(newPlayerStats)
      });
    });

    return () => {};
  }, [results]);

  useEffect(() => {
    if (playersGameStats.length === 0) return;
    console.log('playersGameStats changed');
    evaluateQuestionStats(playersGameStats);
    return () => {};
  }, [playersGameStats]);
  const toggleShowStatus = () => {
    setshowStatus(!showStatus);
  };
  const evaluateQuestionStats = (playersStats) => {
    if (playersStats.length === 0) return;
    let questionStats = getCopy(questionCurrectStats);
    let timeStats = getCopy(questionTimeStats);
    playersStats.map((value, playerIdx) => {
      value.questionPoints.map((value, questionIdx) => {
        if (value) {
          if (questionIdx in questionStats) {
            const temp = getCopy(questionStats);
            temp[questionIdx] = temp[questionIdx] + 1;
            questionStats = temp;
          } else {
            const temp = getCopy(questionStats);
            temp[questionIdx] = 1;
            questionStats = temp;
          }
        } else {
          if (!(questionIdx in questionStats)) {
            const temp = getCopy(questionStats);
            temp[questionIdx] = 0;
            questionStats = temp;
          }
        }
        return null;
      });
      // console.log("mapping: ", value.name);
      value.timeTaken.map((value, questionIdx) => {
        if (questionIdx in timeStats) {
          const temp = timeStats;
          temp[questionIdx] = temp[questionIdx] + value;
          timeStats = temp;
        } else {
          const temp = timeStats;
          temp[questionIdx] = value;
          timeStats = temp;
        }
        return null;
      });
      return null;
    });
    setQuestionCurrectStats(questionStats);
    setQuestionTimeStats(timeStats);
  };
  useEffect(() => {
    console.log(questionCurrectStats);
    return () => {};
  }, [questionCurrectStats]);
  const calculalatePlayerPoint = (playerResult) =>
    new Promise((resolve, reject) => {
      // console.log(playerResult);
      const { name, answers } = playerResult;
      const questionPoints = answers.map((answer, idx) => {
        if (answer.correct) {
          return Number(questions[idx].points.value);
        } else {
          return 0;
        }
      });
      const questionTimeTaken = answers.map((answer, idx) => {
        return new Date(answer.answeredAt) - new Date(answer.questionStartedAt);
      });

      resolve({
        name: name,
        questionPoints: questionPoints,
        totalPoints: questionPoints.reduce((a, b) => a + b, 0),
        timeTaken: questionTimeTaken,
      });
    });
  return (
    <Card>
      <Card.Header>Details of session {sessionId}</Card.Header>
      <Button
        buttonText={showStatus ? 'Hide results' : 'Show results'}
        buttonAction={toggleShowStatus}
      ></Button>
      {showStatus && (
        <div>
          <Card.Title style={{ textAlign: 'center' }}>LeaderBoard(TOP 5)</Card.Title>
          <ListGroup>
            {playersGameStats.map((value, idx) => {
              if (idx < 5) {
                return (
                  <ListGroupItem key={idx}>
                    {value.name} Points: {value.totalPoints}{' '}
                  </ListGroupItem>
                );
              } else {
                return null;
              }
            })}
          </ListGroup>
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <div style={{ height: 600, width: 600 }}>
              <Bar
                // data={Object.entries(questionCurrectStats).map((value,idx) => {return value})}
                data={{
                  labels: Object.keys(questionCurrectStats).map(
                    (value, idx) => {
                      return `Question${Number(value) + 1}`;
                    }
                  ),
                  datasets: [
                    {
                      label: 'Correct Answer Percentage',
                      backgroundColor: 'rgba(99,255,132,0.2)',
                      borderColor: 'rgba(99,255,132,0.2)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(99,255,132,0.5)',
                      hoverBorderColor: 'rgba(99,255,132,0.5)',
                      data: Object.entries(questionCurrectStats).map(
                        (value, idx) => {
                          return (value[1] / playersGameStats.length) * 100;
                        }
                      ),
                    },
                  ],
                }}
                options={{
                  title: {
                    display: true,
                    text: 'Players correctly answered statistics',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
            <div style={{ height: 600, width: 600 }}>
              <Bar
                // data={Object.entries(questionCurrectStats).map((value,idx) => {return value})}
                data={{
                  labels: Object.keys(questionTimeStats).map((value, idx) => {
                    return `Question${Number(value) + 1}`;
                  }),
                  datasets: [
                    {
                      label: 'Average Answer Time in Seconds',
                      backgroundColor: 'rgba(99,255,132,0.2)',
                      borderColor: 'rgba(99,255,132,0.2)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(99,255,132,0.5)',
                      hoverBorderColor: 'rgba(99,255,132,0.5)',
                      data: Object.entries(questionTimeStats).map(
                        (value, idx) => {
                          return value[1] / playersGameStats.length / 1000;
                        }
                      ),
                    },
                  ],
                }}
                options={{
                  title: {
                    display: true,
                    text: 'Average response statistics',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

GameResultStats.propTypes = {
  questions: PropTypes.any,
  sessionId: PropTypes.any,
  showStatusDefault: PropTypes.bool,
};
