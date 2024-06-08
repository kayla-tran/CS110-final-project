import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Trending from './components/trending/Trending';
import Search from './components/search/Search';
import Account from './components/account/Account';
import Login from './components/login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
