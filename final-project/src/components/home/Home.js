import React, { useEffect, useState } from 'react';
import './Home.css';
import chefHat from '../../assets/chefHat.jpeg';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        const posts = await response.json();
        console.log('Response Data:', posts);
        console.log("Number of posts:", posts.length);
        
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        
        <div key={post._id} className="post">

          <div className="element">
            <div className = "top-bar">

              <div><img src={chefHat} className="chefHat"/></div>
              <div><h3>{post.userName}</h3></div>
              <div><p>{post.createdAt}</p></div>
            </div>
          </div>

          <div className="element">
            <img src={post.image} alt="chk pot pie" className="post-img"/>
          </div>

          <div className="element">
            <div className ="bottom-box">
              <p>{post.caption}</p>
              <p>{post.content}</p>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Home;
