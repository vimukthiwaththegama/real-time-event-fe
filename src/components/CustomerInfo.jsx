// src/components/CustomerInfo.js
import React, { useState } from 'react';

const CustomerInfo = () => {
  const [ticketCount, setTicketCount] = useState('');
  const [customers, setCustomers] = useState([]);
  const [customerCounter, setCustomerCounter] = useState(1);

  const handleAddCustomer = () => {
    if (isNaN(ticketCount)) {
      alert('Please enter numeric values only.');
      return;
    }

    const newCustomer = { customerId: customerCounter, totalTicketsBuy:ticketCount };
    fetch('http://localhost:8080/api/v1/customer/addCustomer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer),
    }).then(() => {
      setCustomers([...customers, newCustomer]);
      setTicketCount('');
      setCustomerCounter(customerCounter + 1);
    });
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <input
        type="text"
        placeholder="Ticket Count"
        value={ticketCount}
        onChange={(e) => setTicketCount(e.target.value)}
      />
      <button onClick={handleAddCustomer}>Add</button>
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>{`Customer Number: ${customer.customerNumber}, Ticket Count: ${customer.ticketCount}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerInfo;