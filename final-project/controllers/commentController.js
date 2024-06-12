const { ObjectId } = require('mongodb');

async function addComment(req, res) {
  try {
    const { postId } = req.params;
    const { user, message } = req.body;
    const db = req.app.locals.db;
    const posts = db.collection('posts');
    const comment = {
      user,
      message 
    };

    const result = await posts.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: comment } }
    );

    if (result.modifiedCount === 1) {
      res.status(201).json({ message: 'Comment added successfully', comment });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  addComment
};
