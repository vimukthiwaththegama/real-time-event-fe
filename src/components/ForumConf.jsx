// src/components/ForumConf.js
import React, { useState } from 'react';

const ForumConf = () => {
  const [ticketReleaseRate, setTicketReleaseRate] = useState('');
  const [ticketsRetrievalRate, setTicketsRetrievalRate] = useState('');
  const [totalTickets, setTotalTickets] = useState('');
  const [maxTickets, setMaxTickets] = useState('');
  const [configs, setConfigs] = useState([]);

  const handleAddConfig = () => {
    const newConfig = { ticketReleaseRate, ticketsRetrievalRate, totalTickets, maxPoolCapacity:maxTickets };
    fetch('http://localhost:8080/api/v1/config/addConfig', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newConfig),
    }).then(() => {
      setConfigs([...configs, newConfig]);
      setTicketReleaseRate('');
      setTicketsRetrievalRate('');
      setTotalTickets('');
      setMaxTickets('');
    });
  };

  return (
    <div>
      <h2>Add Configuration</h2>
      <input
        type="text"
        placeholder="Ticket Release Rate"
        value={ticketReleaseRate}
        onChange={(e) => setTicketReleaseRate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tickets Retrieval Rate"
        value={ticketsRetrievalRate}
        onChange={(e) => setTicketsRetrievalRate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Total Tickets"
        value={totalTickets}
        onChange={(e) => setTotalTickets(e.target.value)}
      />
      <input
        type="text"
        placeholder="Maximum Number of Tickets"
        value={maxTickets}
        onChange={(e) => setMaxTickets(e.target.value)}
      />
      <button onClick={handleAddConfig}>Add</button>
      <ul>
        {configs.map((config, index) => (
          <li key={index}>{`Release Rate: ${config.ticketReleaseRate}, Retrieval Rate: ${config.ticketsRetrievalRate}, Total Tickets: ${config.totalTickets}, Max Tickets: ${config.maxTickets}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ForumConf;