import React, { useEffect, useState } from 'react';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  const fetchSavedArticles = async () => {
    try {
      // Fetch saved articles from the backend
      const response = await fetch('/api/get-saved-articles');
      const data = await response.json();
      setSavedArticles(data);
    } catch (error) {
      console.error('Error fetching saved articles:', error);
    }
  };

  return (
    <div>
      <h1>Saved Articles</h1>
      {savedArticles.map((article) => (
        <div key={article._id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          {/* Add any additional information or links you want to display */}
        </div>
      ))}
    </div>
  );
};

export default SavedArticles;
