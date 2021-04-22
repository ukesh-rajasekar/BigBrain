import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ShowTimeCounter ({
  startTime,
  timeLimit,
  handleTimeout,
}) {
  console.log(startTime, timeLimit);
  const [count, setCounter] = useState(Number(timeLimit));
  useEffect(() => {
    const counter = setInterval(() => {
      const now = new Date();
      const timeNow = now.getTime();
      const start = new Date(startTime);
      const timeStart = start.getTime();
      const time = Math.ceil((timeNow - timeStart) / 1000);
      if (timeLimit - time < 0) {
        handleTimeout();
        clearInterval(counter);
      } else {
        setCounter(time);
      }
    }, 1000);
    return () => {
      clearInterval(counter);
    };
  }, [count]);

  return <div>Time Left: {timeLimit - count}</div>;
}

ShowTimeCounter.propTypes = {
  startTime: PropTypes.string,
  timeLimit: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  handleTimeout: PropTypes.func,
};
