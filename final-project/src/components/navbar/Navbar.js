import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul><Link to="/">Home</Link></ul>
      <ul><Link to="/trending">Trending</Link></ul>
      <ul><Link to="/search">Search</Link></ul>
      <ul><Link to="/account">Account</Link></ul>
      <ul><Link to="/create-post">Create Post</Link></ul>
    </nav>
  );
};

export default Navbar;
