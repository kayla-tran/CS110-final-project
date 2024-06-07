import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/trending">Trending</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
