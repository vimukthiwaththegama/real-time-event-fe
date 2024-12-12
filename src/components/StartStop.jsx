import React, { useState } from 'react';

const StartStop = () => {
  const [configNumber, setConfigNumber] = useState('');

  const handleStart = () => {
    fetch(`http://localhost:8080/api/v1/execute/${configNumber}`, { method: 'POST' });
  };

  const handleStop = () => {
    fetch('http://localhost:8080/api/v1/execute/stop', { method: 'POST' });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Configuration Number"
        value={configNumber}
        onChange={(e) => setConfigNumber(e.target.value)}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default StartStop;