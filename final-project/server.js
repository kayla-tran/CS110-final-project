const express = require('express');
const cookieParser = require('cookie-parser');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const uri = "mongodb+srv://kelseymoose346:opZ67GDDM8cB9gkB@fyp.b3mredm.mongodb.net/?retryWrites=true&w=majority&appName=FYP";
const client = new MongoClient(uri);

app.use(cors({
  origin: 'http://localhost:3000', // Adjust based on your frontend
  credentials: true // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'scary-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

//===============CONNECT TO MONGO===============

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("test");
    app.locals.db = db;
    console.log("Connected to MongoDB");

    const collections = await db.listCollections().toArray();
    if (!collections.map(coll => coll.name).includes("users")) {
      await db.createCollection("users");
      console.log("Created users collection");
    }
    if (!collections.map(coll => coll.name).includes("posts")) {
      await db.createCollection("posts");
      console.log("Created posts collection");
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}
connectToDatabase();

//===============LOGIN AND ACCOUNT===================

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = req.app.locals.db;
    const users = db.collection('users');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    await users.insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = req.app.locals.db;
    const users = db.collection('users');
    const user = await users.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    req.session.user = { username: user.username };
    
    console.log('Session user:', req.session.user);
    console.log('Session:', req.session);

    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ username: req.session.user.username });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

//===========UPDATING ACCOUNT==============

app.put('/profile', async (req, res) => {
  try {
    console.log('Session for update:', req.session);
    console.log('session USER: ', req.session.user);
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { newUsername, currentPassword, newPassword } = req.body;
    const db = req.app.locals.db;
    const users = db.collection('users');

    // Update username
    if (newUsername) {
      const existingUser = await users.findOne({ username: newUsername });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      await users.updateOne(
        { username: req.session.user.username },
        { $set: { username: newUsername } }
      );

      req.session.user.username = newUsername;
      return res.status(200).json({ message: 'Username updated successfully' });
    }

    // Update password
    if (currentPassword && newPassword) {
      const user = await users.findOne({ username: req.session.user.username });

      if (!user || !await bcrypt.compare(currentPassword, user.password)) {
        return res.status(400).json({ error: 'Invalid current password' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await users.updateOne(
        { username: req.session.user.username },
        { $set: { password: hashedNewPassword } }
      );

      return res.status(200).json({ message: 'Password updated successfully' });
    }

    res.status(400).json({ error: 'No valid update fields provided' });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update username
// app.put('/profile', async (req, res) => {
//   try {
//     if (!req.session.user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//     const { newUsername } = req.body;
//     const db = req.app.locals.db;
//     const users = db.collection('users');

//     const existingUser = await users.findOne({ username: newUsername });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     await users.updateOne(
//       { username: req.session.user.username },
//       { $set: { username: newUsername } }
//     );

//     req.session.user.username = newUsername;
//     res.status(200).json({ message: 'Username updated successfully' });
//   } catch (err) {
//     console.error("Update username error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Update password
// app.put('/profile/password', async (req, res) => {
//   try {
//     if (!req.session.user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//     const { currentPassword, newPassword } = req.body;
//     const db = req.app.locals.db;
//     const users = db.collection('users');
//     const user = await users.findOne({ username: req.session.user.username });

//     if (!user || !await bcrypt.compare(currentPassword, user.password)) {
//       return res.status(400).json({ error: 'Invalid current password' });
//     }

//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//     await users.updateOne(
//       { username: req.session.user.username },
//       { $set: { password: hashedNewPassword } }
//     );

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (err) {
//     console.error("Update password error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


//============POSTS=============

app.post('/posts', async (req, res) => {
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
});

app.get('/posts', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const posts = db.collection('posts');
    const allPosts = await posts.find().toArray();
    res.status(200).json(allPosts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//===========COMMENTS==============

app.post('/posts/:postId', async (req, res) => {
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
});




app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));