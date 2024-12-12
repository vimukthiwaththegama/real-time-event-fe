import React, { useState, useEffect } from 'react';
import './ConfList.css';

const ConfList = () => {
  const [fields, setFields] = useState({
    totalTickets: '',
    maxPoolCapacity: '',
    retrievalRate: '',
    releaseRate: '',
  });
  const [sequenceNumber, setSequenceNumber] = useState(1);
  const [configList, setConfigList] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/config/addConfig'); // Replace with your API URL
        const data = await response.json();
        setFields({
          totalTickets: data.totalTickets || '',
          maxPoolCapacity: data.maxTickets || '',
          retrievalRate: data.retrievalRate || '',
          releaseRate: data.releaseRate || '',
        });
        setSequenceNumber(data.no || 1); // Initialize sequence number from API data if available
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleAdd = () => {
    // Increment sequence number and update fields
    const newConfig = { ...fields, no: sequenceNumber };
    setConfigList((prevList) => [...prevList, newConfig]);
    setSequenceNumber((prevNumber) => prevNumber + 1);
    setFields({
      totalTickets: '',
      maxTickets: '',
      retrievalRate: '',
      releaseRate: '',
    });
  };

  return (
    <div className="number-input-container">
      <div className="input-item">
        <label htmlFor="configNumber" className="input-label">
          Configuration Number:
        </label>
        <input
          id="configNumber"
          type="number"
          value={sequenceNumber}
          readOnly
          className="number-input"
        />
      </div>
      {Object.entries(fields).map(([key, value]) => (
        <div key={key} className="input-item">
          <label htmlFor={key} className="input-label">
            {formatLabel(key)}:
          </label>
          <input
            id={key}
            type="number"
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="number-input"
          />
        </div>
      ))}
      <button onClick={handleAdd}>Add</button>
      <ul>
        {configList.map((config, index) => (
          <li key={index}>
            {`Configuration Number: ${config.no}, Total Tickets: ${config.totalTickets}, Max Tickets: ${config.maxTickets}, Retrieval Rate: ${config.retrievalRate}, Release Rate: ${config.releaseRate}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

const formatLabel = (key) => {
  // Format the label to make it readable
  return key
    .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
};

export default ConfList;