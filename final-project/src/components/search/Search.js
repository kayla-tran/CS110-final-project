// Search.js
import React from 'react';
import './Search.css';

function Search() {
  return (
    <div className="search-container">
      <header>
        <h1>Search</h1>
        <p>Search for recipes and users here.</p>
      </header>
      <main>
        <form id="searchForm">
          <input type="text" id="searchInput" placeholder="Enter your search query..." />
          <button type="submit">Search</button>
        </form>
        <div id="searchResults">
          {/* Search results will be displayed here */}
        </div>
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Search;
