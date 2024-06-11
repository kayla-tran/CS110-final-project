import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Trending from './components/trending/Trending';
import Search from './components/search/Search';
import Account from './components/account/Account';
import Login from './components/login/Login';
import PostForm from './components/post/PostForm';


import './App.css';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        
        <Route path="/trending" element={<Trending />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account  />} />
        {/* <Route path="/login" element={<Login  />} />
        <Route path="/create-post" element={<PostForm onPostCreated={handlePostCreated} />} /> */}
        <Route
          path="/login"
          element={<Login onLogin={(username) => setLoggedInUser(username)} />}
        />
        <Route
          path="/create-post"
          element={<PostForm username={loggedInUser} />}
        />
        <Route path="/" element={<Home username={loggedInUser} />} />
        <Route path="*" element={<Login />} />  {/* Redirect all unknown paths to Login */}

      </Routes>
    </div>
  );
}

export default App;
