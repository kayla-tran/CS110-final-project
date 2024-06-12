import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="bar">
        <div className="barContent">
          <div className="left">
            <div className="barButton">
              <ul><Link to="/">Home</Link></ul>
            </div>
            <div className="barButton">
              <ul><Link to="/trending">Trending</Link></ul>
            </div>
            <div className="barButton">
              <ul><Link to="/search">Search</Link></ul>
            </div>
            <div className="barButton">
              <ul><Link to="/create-post">Create Post</Link></ul>
            </div>
          </div>
          <div className="right">
            <div className="barButton">
              <ul><Link to="/profile">Profile</Link></ul>
            </div>
            <div className="barButton">
              <ul><Link to="/account">Login</Link></ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
