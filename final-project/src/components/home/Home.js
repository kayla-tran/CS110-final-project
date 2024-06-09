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
        setPosts(posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div className="post">
          <div key={post._id}>

            <div className="element">
              <div className = "top-bar">

                <div><img src={chefHat} className="chefHat"/></div>
                <div><h3>{post.title}</h3></div>
                <div><p>{post.createdAt}</p></div>
              </div>
            </div>

            <div className="element">
              <img src={post.image} alt="chk pot pie"/>
            </div>

            <div className="element">
              <div className ="bottom-box">
                <p>{post.caption}</p>
                <p>{post.content}</p>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
