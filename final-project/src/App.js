import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Trending from './components/trending/Trending';
import Search from './components/search/Search';
import Account from './components/account/Account';
import Login from './components/login/Login';
import PostForm from './components/post/PostForm';
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const handlePostCreated = (newPost) => {
    // Optionally update the post list when a new post is created
    console.log('Post created:', newPost);
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account authToken={authToken} setAuthToken={setAuthToken} />} />
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route path="/create-post" element={<PostForm authToken={authToken} onPostCreated={handlePostCreated} />} />
      </Routes>
    </div>
  );
}

export default App;
