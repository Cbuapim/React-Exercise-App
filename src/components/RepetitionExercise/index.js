import { useState } from "react";
import "./RepetitionExercise.css";
function RepetitionExercise({ name, onReturn }) {
  const [count, setCount] = useState(0);
  return (
    <div className="exercise-container">
      <h2 className="exercise-name">{name}</h2>
      <p className="counter-label">Reps: {count}</p>
      <div className="button-row">
        <button className="btn" onClick={() => setCount(count + 1)}>Complete Rep</button>
        <button className="btn" onClick={() => setCount(0)}>Reset</button>
        <button className="btn" onClick={onReturn}>Return</button>
      </div>
    </div>
  );
}
export default RepetitionExercise;
