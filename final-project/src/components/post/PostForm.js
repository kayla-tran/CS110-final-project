import React, { useState } from 'react';
import './Post.css';

const PostForm = ({ username }) => {
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [postCreated, setPostCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, content, caption, image }), // Include all fields here
      });
      if (response.ok) {
        const post = await response.json();
        // Reset form fields
        setUserName(username);
        setContent('');
        setCaption('');
        setImage('');
        // Show success message
        setPostCreated(true);
        // Hide success message after a delay
        setTimeout(() => setPostCreated(false), 3000);
      } else {
        console.error('Failed to create post');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="postForm"><strong>Posting as: {"\t" + username}</strong></p>
        <div className='createPost'>
          <textarea
            placeholder="Recipe"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <button type="submit">Create Post</button>
        </div>
      </form>
      {postCreated && <p className="successMessage">Post created!</p>}
    </div>
  );
};

export default PostForm;
