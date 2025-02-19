import React, { useState } from 'react';
import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';

function App() {
  const [selectedExercise, setSelectedExercise] = useState('');

  function handleExerciseSelection(exercise) {
    setSelectedExercise(exercise);
  }

  return (
    <div>
      <h1>Exercise Tracker</h1>
      <div>
        {!selectedExercise ? (
          <div>
            <button onClick={() => handleExerciseSelection('Repetition')}>Repetition Exercise</button>
            <button onClick={() => handleExerciseSelection('Duration')}>Duration Exercise</button>
          </div>
        ) : selectedExercise === 'Repetition' ? (
          <RepetitionExercise name="Push-ups" />
        ) : (
          <DurationExercise name="Running" />
        )}
      </div>
    </div>
  );
}

export default App;
