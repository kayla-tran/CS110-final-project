import React, { useEffect, useState } from 'react';
import './Trending.css';
import chefHat from '../../assets/chefHat.jpeg';

const Trending = ({username}) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  const fetchTrendingPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts/'); 
      const posts = await response.json();
      const sortedPosts = posts.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
      //const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const topTrendingPosts = sortedPosts.slice(0, 10);
      setTrendingPosts(topTrendingPosts);
      console.log('Top Trending Posts:', topTrendingPosts);

      topTrendingPosts.forEach(post => {
        console.log(`Post ID: ${post._id}`);
        console.log(`User Name: ${post.userName}`);
        console.log(`Created At: ${post.createdAt}`);
        console.log(`Number of Comments: ${post.comments?.length || 0}`);
        console.log(`Caption: ${post.caption}`);
        console.log(`Content: ${post.content}`);
        console.log(`Image: ${post.image}`);
      });
    } catch (err) {
      console.error('Error fetching trending posts:', err);
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  return (
    <div className="post-container">
      {trendingPosts.map((post) => (
        <div key={post._id} className="post">
          <div className="element">
            <div className="top-bar">
              <div>
                <img src={chefHat} className="chefHat" alt="Chef Hat" />
              </div>
              <div>
                <h3>{post.username ?? 'Unknown User'}</h3>
              </div>
              <div>
                <p>{new Date(post.createdAt).toLocaleString() ?? 'Unknown Date'}</p>
              </div>
            </div>
          </div>
          <div className="element">
            {post.image ? (
              <img src={post.image} alt="Post" className="post-img" />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
          <div className="element">
            <div className="bottom-box">
              <p>{post.caption ?? 'No Caption'}</p>
              <p>{post.content ?? 'No Content'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trending;
