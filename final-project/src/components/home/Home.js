import React, { useEffect, useState } from 'react';
import './Home.css';
import chefHat from '../../assets/chefHat.jpeg';

const Home = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      const posts = await response.json();
      console.log('Response Data:', posts);
      console.log("Number of posts:", posts.length);
      setPosts(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-container">
      <p></p>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="element">
            <div className="top-bar">
              <div>
                <img src={chefHat} className="chefHat" alt="Chef Hat" />
              </div>
              <div>
                <h3>@{post.username ?? 'Unknown User'}</h3>
              </div>
              <div>
                <p>{new Date(post.createdAt).toLocaleString() ?? 'Unknown Date'}</p>
              </div>
            </div>
          </div>
          <div className="element post-content"> {/* Move post-content below top-bar */}
            <div>
              {post.image ? (
                <img src={post.image} alt="Post" className="post-img" />
              ) : (
                <p>No Image Available</p>
              )}
            </div>
            <div className="bottom-box">
              <p className = "caption">{post.caption ?? 'No Caption'}</p>
              <p className = "content">{post.content ?? 'No Content'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
);

};

export default Home;
