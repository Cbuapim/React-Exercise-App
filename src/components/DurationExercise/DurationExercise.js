import React, { useState, useEffect } from 'react';

function DurationExercise(props) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Cleanup
  }, [isRunning, time]);

  function startTimer() {
    setIsRunning(true);
  }

  function stopTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setTime(0);
  }

  function formatTime(t) {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <p>Time: {formatTime(time)}</p>
      <button onClick={startTimer} disabled={isRunning}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default DurationExercise;
