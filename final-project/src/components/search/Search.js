import React, { useState, useEffect } from 'react';
import './Search.css';
import CommentForm from '../commentForm/CommentForm'; 
import chefHat from '../../assets/chefHat.jpeg';


function Search() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [usernameQuery, setUsernameQuery] = useState('');
  const [captionQuery, setCaptionQuery] = useState('');
  const [contentQuery, setContentQuery] = useState('');
  const [showComments, setShowComments] = useState({});
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        const data = await response.json();
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = posts.filter(
      (post) =>
        (usernameQuery === '' || post.username.toLowerCase().includes(usernameQuery.trim().toLowerCase())) &&
        (captionQuery === '' || post.caption.toLowerCase().includes(captionQuery.trim().toLowerCase())) &&
        (contentQuery === '' || post.content.toLowerCase().includes(contentQuery.trim().toLowerCase()))
    );
    setFilteredPosts(filtered);
  };

    // Function to toggle comment container visibility
    const toggleComments = (postId) => {
      setShowComments(prevState => ({
        ...prevState,
        [postId]: !prevState[postId]
      }));
    };
  
  return (
    
    <div className="search-container">
      <header>
        <h1>Search</h1>
        <p>Search for recipes and users here.</p>
      </header>
      <main>
        <form id="searchForm" onSubmit={handleSearch}>
          <input
            type="text"
            id="usernameInput"
            placeholder="Search by username..."
            value={usernameQuery}
            onChange={(e) => setUsernameQuery(e.target.value)}
          />
          <input
            type="text"
            id="captionInput"
            placeholder="Search by caption..."
            value={captionQuery}
            onChange={(e) => setCaptionQuery(e.target.value)}
          />
          <input
            type="text"
            id="contentInput"
            placeholder="Search by recipe content..."
            value={contentQuery}
            onChange={(e) => setContentQuery(e.target.value)}
          />
        </form>
        <button type="submit">Search</button>
        <div className="post-container">
        <div id="searchResults">
          {filteredPosts.map((post) => (
             <div key={post._id} className="post">
             <div className="element">
               <div className="top-bar">
                 <div>
                   <img src={chefHat} className="chefHat" alt="Chef Hat" />
                 </div>
                 <div>
                   <h3>@{post.username ?? 'Unknown User'}</h3>
                 </div>
                 <div>
                   <p>{new Date(post.createdAt).toLocaleString() ?? 'Unknown Date'}</p>
                 </div>
               </div>
             </div>
             <div className="element post-content"> {/* Move post-content below top-bar */}
               <div>
                 {post.image ? (
                   <img src={post.image} alt="Post" className="post-img" />
                 ) : (
                   <p>No Image Available</p>
                 )}
               </div>
               <div className="bottom-box">
                 <p className = "caption">{post.caption ?? 'No Caption'}</p>
                 <p className = "content">{post.content ?? 'No Content'}</p>
               </div>
             </div>
             {/* Comment button */}
             <button className="comments" onClick={() => toggleComments(post._id)}>Comments</button>
             {/* Comment container */}
             {showComments[post._id] && (
               <div className="comment-container">
                 {post.comments && post.comments.length > 0 ? (
                   post.comments.map((comment, index) => (
                     <div key={index} className="comment">
                       <p><strong>{comment.user}:</strong> {comment.message}</p>
                     </div>
                   ))
                 ) : (
                   <p>No comments yet.</p>
                 )}
                 <CommentForm postId={post._id} fetchPosts={post.fetchPosts} username={post.username} /> 
               </div>
             )}
           </div>
         ))}
       </div>
       </div>
      </main>
    </div>
  );
}

export default Search;
