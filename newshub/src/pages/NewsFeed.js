import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NewsFeed = ({ userInterest }) => {
  const [newsData, setNewsData] = useState([]);
  


  useEffect(() => {
    const fetchNews = async () => {
      try {
        let apiUrl =
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=795a1b7ee9ed4237839189492839c67b";

        if (userInterest) {
          apiUrl += "&q=" + userInterest;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [userInterest]);

 
  return (
    <div className="container">
      {newsData.map((article) => (
        <div key={article.url} className="news-article">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <Link to={article.url} target="_blank" className="read-more">
            Read more
          </Link>
          {/* {article.image && (
            <img src={article.image} alt={article.title} className="article-image" />
          )} */}
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="article-image"
            />
          ) : (
            <p className="no-image">Image not available</p>
          )}

          <p className="published-date">
            Published at: {new Date(article.publishedAt).toLocaleString()}
          </p>

        </div>
      ))}
    </div>
  );
};

export default NewsFeed;





// import "./style.css";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import SaveArticle from "./SaveArticle"; // Import the SaveArticle component


// const NewsFeed = ({ userInterest }) => {
//   const [newsData, setNewsData] = useState([]);
//   const [savedArticles, setSavedArticles] = useState([]);
  

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         let apiUrl =
//           "https://newsapi.org/v2/top-headlines?country=us&apiKey=795a1b7ee9ed4237839189492839c67b";

//         if (userInterest) {
//           apiUrl += "&q=" + userInterest;
//         }

//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         setNewsData(data.articles);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       }
//     };

//     fetchNews();
//   }, [userInterest]);

//   const saveArticle = (article) => {
//     if (!savedArticles.some((savedArticle) => savedArticle.url === article.url)) {
//       setSavedArticles([...savedArticles, article]);
//     }
//   };

//   return (
//     <div className="news-feed-container">
//       <h2>News Feed</h2>
//       <div className="articles-list">
//         {newsData.map((article) => (
//           <div key={article.url} className="news-article">
//             <h3>{article.title}</h3>
//             <p>{article.description}</p>
//             <SaveArticle article={article} onSave={saveArticle} />
//             <Link to={article.url} target="_blank" className="read-more">
//               Read more
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewsFeed;
