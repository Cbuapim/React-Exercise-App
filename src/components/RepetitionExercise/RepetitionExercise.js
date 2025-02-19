import React, { useState } from 'react';

function RepetitionExercise(props) {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <p>Repetitions: {count}</p>
      <button onClick={increment}>Increase</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default RepetitionExercise;
