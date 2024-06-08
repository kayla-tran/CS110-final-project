import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <ul><Link to="/">Home</Link></ul>
        <ul><Link to="/trending">Trending</Link></ul>
        <ul><Link to="/search">Search</Link></ul>
        <ul><Link to="/account">Account</Link></ul>
        <ul><Link to="/login">Login</Link></ul>
      </ul>
    </nav>
  );
}

export default Navbar;
