import React, { useState } from 'react';

const SelectInterest = ({ interests, onInterestChange }) => {
  const [selectedInterest, setSelectedInterest] = useState('');

  const handleInterestChange = (event) => {
    const interest = event.target.value;
    setSelectedInterest(interest);
    onInterestChange(interest);
  };

  return (
    <div className='interest-drp'>
      <label htmlFor="interest-dropdown">Select Interest:</label>
      <select
        id="interest-dropdown"
        value={selectedInterest}
        onChange={handleInterestChange}
      >
        <option value="">--Select Interest--</option>
        {interests.map((interest) => (
          <option key={interest} value={interest}>
            {interest}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInterest;
