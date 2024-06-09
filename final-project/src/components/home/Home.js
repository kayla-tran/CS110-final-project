import React, { useEffect, useState } from 'react';

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
            <h3>{post.title}</h3>
            <img src={post.image} alt="chk pot pie"/>
            <p>{post.caption}</p>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
