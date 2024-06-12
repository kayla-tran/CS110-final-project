import React, { useState } from 'react';

const CommentForm = ({ postId, handleCommentSubmit, username }) => {
  const [newComment, setNewComment] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    await handleCommentSubmit(postId); // Call the handleCommentSubmit function passed as a prop
    setNewComment(''); // Clear comment input after submission
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        value={newComment}
        onChange={handleCommentChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;

  