import { useState } from "react";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import "./App.css";

const EXERCISES = [
  { name: "Push Ups", type: "repetition" },
  { name: "Bicycling", type: "duration" },
  { name: "Jumping Jacks", type: "repetition" },
  { name: "Running", type: "duration" },
  { name: "Sit Ups", type: "repetition" },
];

function App() {
  const [selected, setSelected] = useState(null);
  let screen;
  if (selected === null) {
    screen = (
      <div className="menu-screen">
        <h1 className="app-title">Go Do Something!</h1>
        <p className="app-subtitle">Select an exercise:</p>
        <div className="exercise-list">
          {EXERCISES.map((ex) => (
            <button key={ex.name} className="exercise-btn" onClick={() => setSelected(ex)}>
              {ex.name}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    const ExerciseComponent = selected.type === "repetition" ? RepetitionExercise : DurationExercise;
    screen = (
      <div className="exercise-screen">
        <ExerciseComponent name={selected.name} onReturn={() => setSelected(null)} />
      </div>
    );
  }
  return <div className="app">{screen}</div>;
}
export default App;
