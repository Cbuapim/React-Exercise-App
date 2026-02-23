import { useState, useEffect, useRef } from "react";
import "./DurationExercise.css";
function DurationExercise({ name, onReturn }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const savedElapsedRef = useRef(0);
  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - savedElapsedRef.current;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      savedElapsedRef.current = elapsed;
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);
  function handleReset() { setRunning(false); setElapsed(0); savedElapsedRef.current = 0; }
  function pad(n) { return String(n).padStart(2, "0"); }
  const totalSeconds = Math.floor(elapsed / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const ms = Math.floor((elapsed % 1000) / 10);
  return (
    <div className="exercise-container">
      <h2 className="exercise-name">{name}</h2>
      <p className="timer-label">Timer: {pad(mins)}:{pad(secs)}.{pad(ms)}</p>
      <div className="button-row">
        {!running && <button className="btn" onClick={() => setRunning(true)}>Start</button>}
        <button className="btn" onClick={handleReset}>Reset</button>
        <button className="btn" onClick={onReturn}>Return</button>
      </div>
    </div>
  );
}
export default DurationExercise;
