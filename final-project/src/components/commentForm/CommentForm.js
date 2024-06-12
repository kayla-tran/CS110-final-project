import React, { useState } from 'react';

const CommentForm = ({ postId, fetchPosts, username }) => {
  const [content, setContent] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: username, content, caption, image, comments: [] }),
      });

      if (response.ok) {
        fetchPosts(); // Refresh posts after adding a new comment
        setContent(''); // Clear comment input
        setCaption(''); // Clear caption input
        setImage(''); // Clear image input
      } else {
        console.error('Failed to add comment');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <p>Posting as: <strong>{username}</strong></p>
      <textarea
        placeholder="Add your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
