import { useState, useEffect, useRef } from "react";
import "./DurationExercise.css";

function DurationExercise({ name, emoji, goal, initialValue, onProgress, onReturn }) {
  const [elapsed, setElapsed] = useState(initialValue || 0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const savedElapsedRef = useRef(initialValue || 0);

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - savedElapsedRef.current;
      intervalRef.current = setInterval(() => {
        const next = Date.now() - startTimeRef.current;
        setElapsed(next);
        if (onProgress) onProgress(next);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      savedElapsedRef.current = elapsed;
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function handleReset() {
    setRunning(false);
    setElapsed(0);
    savedElapsedRef.current = 0;
    if (onProgress) onProgress(0);
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  const totalSeconds = Math.floor(elapsed / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const ms = Math.floor((elapsed % 1000) / 10);
  const pct = Math.min(100, Math.round((elapsed / (goal * 1000)) * 100));

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
          <span className="stat-value">{goal}s</span>
          <span className="stat-label">Goal</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value">{pad(mins)}:{pad(secs)}</span>
          <span className="stat-label">Elapsed</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value">{pct}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>

      <div className="timer-card">
        <span className="timer-display">
          {pad(mins)}:{pad(secs)}<span className="timer-ms">.{pad(ms)}</span>
        </span>
        <span className="timer-sub">of {goal}s goal</span>
        <div className="progress-wrap" style={{ width: "100%" }}>
          <div className="progress-bar" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="action-row">
        {!running
          ? <button className="pill-btn lime" onClick={() => setRunning(true)}>
              {elapsed === 0 ? "Let's Get Started" : "Resume"}
            </button>
          : <button className="pill-btn dark-pause" onClick={() => setRunning(false)}>Pause</button>
        }
        <button className="pill-btn ghost" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default DurationExercise;
