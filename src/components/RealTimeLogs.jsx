// src/components/RealTimeLogs.js
import React, { useEffect, useState } from 'react';

const RealTimeLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/execute/logs');
        const data = await response.json();
        setLogs((prevLogs) => [...prevLogs, ...data]); // Append new logs to existing ones
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    const fetchContinuously = async () => {
      while (isFetching) {
        await fetchLogs();
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before the next fetch
      }
    };

    fetchContinuously();

    return () => setIsFetching(false); // Cleanup to stop fetching on component unmount
  }, [isFetching]);

  return (
    <div>
      <h2>Real-Time Logs</h2>
      <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeLogs;
