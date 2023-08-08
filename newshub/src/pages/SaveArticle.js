import React from 'react';

const SaveArticle = ({ article, onSave }) => {
  const handleSaveClick = () => {
    onSave(article);
  };

  return (
    <button onClick={handleSaveClick} className="save-article-button">
      Save Article
    </button>
  );
};

export default SaveArticle;
