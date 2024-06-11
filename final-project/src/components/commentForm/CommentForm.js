// CommentForm.jsx
import React, { useState } from 'react';

const CommentForm = ({ postId, fetchPosts, username }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
        const currentTime = new Date().toISOString();
      const response = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, message: newComment, time: currentTime }),
      });

      if (response.ok) {
        fetchPosts(); // Refresh posts after adding comment
        setNewComment(''); // Clear comment input
      } else {
        console.error('Error adding comment:', response.statusText);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div className="comment-form">
      <input
        type="text"
        placeholder="Add a comment"
        value={newComment}
        onChange={handleCommentChange}
      />
      <button onClick={handleCommentSubmit}>Submit</button>
    </div>
  );
};

export default CommentForm;
