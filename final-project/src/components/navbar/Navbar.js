import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="bar">
        <ul><Link to="/">Home</Link></ul>
        <ul><Link to="/trending">Trending</Link></ul>
        <ul><Link to="/search">Search</Link></ul>
        <ul><Link to="/create-post">Create Post</Link></ul>
        <ul><Link to="/profile">Profile</Link></ul>
        <ul><Link to="/account">Login</Link></ul>
      </div>
    </nav>
  );
};

export default Navbar;
