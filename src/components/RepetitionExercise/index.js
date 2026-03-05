import { useState } from "react";
import "./RepetitionExercise.css";

function RepetitionExercise({ name, emoji, goal, initialValue, onProgress, onReturn }) {
  const [count, setCount] = useState(initialValue || 0);

  function increment() {
    const next = count + 1;
    setCount(next);
    if (onProgress) onProgress(next);
  }

  function reset() {
    setCount(0);
    if (onProgress) onProgress(0);
  }

  const pct = Math.min(100, Math.round((count / goal) * 100));
  const sets = Math.floor(count / 10);
  const best = Math.max(count, 0);

  return (
    <div className="ex-screen">
      <div className="ex-header">
        <button className="back-btn" onClick={onReturn}>← Back</button>
        <span className="ex-header-label">HOME</span>
        <span style={{ width: 70 }} />
      </div>

      <div className="ex-hero">
        <div className="ex-emoji-badge">{emoji}</div>
        <h2 className="ex-name">{name}</h2>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-value">{sets}</span>
          <span className="stat-label">Sets</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value">{count}</span>
          <span className="stat-label">Total Reps</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value">{pct}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>

      <div className="counter-card">
        <span className="counter-num">{count}</span>
        <span className="counter-sub">of {goal} reps</span>
        <div className="progress-wrap" style={{ width: "100%" }}>
          <div className="progress-bar" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="action-row">
        <button className="pill-btn lime" onClick={increment}>Complete Rep</button>
        <button className="pill-btn ghost" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default RepetitionExercise;
