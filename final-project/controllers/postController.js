const { ObjectId } = require('mongodb');

async function createPost(req, res) {
  try {
    const { username, content, image, caption } = req.body || {};
    const db = req.app.locals.db;
    const posts = db.collection('posts');
    const newPost = { 
      username, 
      content, 
      image, 
      caption, 
      createdAt: new Date(), 
      comments: []
    };

    await posts.insertOne(newPost);
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPosts(req, res) {
  try {
    const db = req.app.locals.db;
    const posts = db.collection('posts');
    const allPosts = await posts.find().toArray();
    res.status(200).json(allPosts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.postId;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const db = req.app.locals.db;
    const posts = db.collection('posts');

    const result = await posts.deleteOne({ _id: new ObjectId(postId) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createPost,
  getPosts,
  deletePost
};
