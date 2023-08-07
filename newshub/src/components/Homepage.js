
import React, { useState } from 'react';
import SelectInterest from '../pages/SelectInterest'; 
import NewsFeed from '../pages/NewsFeed';

const Homepage = () => {
  const availableInterests = ['politics', 'sports', 'technology', 'health'];
  const [userInterest, setUserInterest] = useState('');

  const handleInterestChange = (interest) => {
    setUserInterest(interest);
  };

  return (
    <div>
      <h1>My News App</h1>
      <SelectInterest interests={availableInterests} onInterestChange={handleInterestChange} />
      <NewsFeed userInterest={userInterest} />
    </div>
  );
};

export default Homepage;
