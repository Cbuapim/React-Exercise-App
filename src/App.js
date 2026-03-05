import { useState } from "react";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import "./App.css";

const EXERCISES = [
  { name: "Push Ups",      type: "repetition", emoji: "💪", goal: 20 },
  { name: "Bicycling",     type: "duration",   emoji: "🚴", goal: 120 },
  { name: "Jumping Jacks", type: "repetition", emoji: "🤸", goal: 30 },
  { name: "Running",       type: "duration",   emoji: "🏃", goal: 180 },
  { name: "Sit Ups",       type: "repetition", emoji: "🦾", goal: 15 },
];

function App() {
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState({});

  function updateProgress(name, value) {
    setProgress(prev => ({ ...prev, [name]: value }));
  }

  if (selected === null) {
    return (
      <div className="app">
        <header className="app-header">
          <span className="app-header-title">HOME</span>
          <div className="app-header-logo">🏋️</div>
        </header>
        <div className="menu-screen">
          <h1 className="menu-greeting">
            Let's <span className="accent">Work</span><br />Out Today
          </h1>
          <p className="menu-subtitle">Choose your exercise</p>
          <div className="exercise-list">
            {EXERCISES.map((ex) => {
              const val = progress[ex.name] || 0;
              const pct = ex.type === "repetition"
                ? Math.min(100, Math.round((val / ex.goal) * 100))
                : Math.min(100, Math.round((val / (ex.goal * 1000)) * 100));
              const metaText = ex.type === "repetition"
                ? `${val} / ${ex.goal} reps`
                : `Goal: ${ex.goal}s`;
              return (
                <button key={ex.name} className="exercise-card" onClick={() => setSelected(ex)}>
                  <div className="card-icon">{ex.emoji}</div>
                  <div className="card-body">
                    <span className="card-name">{ex.name}</span>
                    <span className="card-meta">{metaText}</span>
                    <div className="progress-wrap">
                      <div className="progress-bar" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="card-pct">{pct}%</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const ExerciseComponent = selected.type === "repetition" ? RepetitionExercise : DurationExercise;
  return (
    <div className="app">
      <ExerciseComponent
        name={selected.name}
        emoji={selected.emoji}
        goal={selected.goal}
        initialValue={progress[selected.name] || 0}
        onProgress={(val) => updateProgress(selected.name, val)}
        onReturn={() => setSelected(null)}
      />
    </div>
  );
}

export default App;
