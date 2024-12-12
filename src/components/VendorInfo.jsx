// src/components/VendorInfo.js
import React, { useState } from 'react';

const VendorInfo = () => {
  const [ticketCount, setTicketCount] = useState('');
  const [vendors, setVendors] = useState([]);
  const [vendorCounter, setVendorCounter] = useState(1);

  const handleAddVendor = () => {
    if (isNaN(ticketCount)) {
      alert('Please enter numeric values only.');
      return;
    }

    const newVendor = { vendorId: vendorCounter, totalTicketsSell:ticketCount };
    fetch('http://localhost:8080/api/v1/vendor/addVendor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVendor),
    }).then(() => {
      setVendors([...vendors, newVendor]);
      setTicketCount('');
      setVendorCounter(vendorCounter + 1);
    });
  };

  return (
    <div>
      <h2>Add Vendor</h2>
      <input
        type="text"
        placeholder="Ticket Count"
        value={ticketCount}
        onChange={(e) => setTicketCount(e.target.value)}
      />
      <button onClick={handleAddVendor}>Add</button>
      <ul>
        {vendors.map((vendor, index) => (
          <li key={index}>{`Vendor Number: ${vendor.vendorNumber}, Ticket Count: ${vendor.ticketCount}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default VendorInfo;