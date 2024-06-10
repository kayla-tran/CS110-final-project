import React, { useState } from 'react';

const PostForm = ({ username, onPostCreated }) => {
  //const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');

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
        onPostCreated(post);
        // setTitle('');
        setContent('');
        setCaption('');
        setImage('');
      } else {
        console.error('Failed to create post');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /> */}
      <p>Posting as: <strong>{username}</strong></p>
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
    </form>
  );
};

export default PostForm;
