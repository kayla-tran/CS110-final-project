const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb package
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT authentication
const cors = require('cors'); // Import cors middleware

const app = express();
const port = process.env.PORT || 8080;

// MongoDB connection setup
const uri = "mongodb+srv://kelseymoose346:opZ67GDDM8cB9gkB@fyp.b3mredm.mongodb.net/?retryWrites=true&w=majority&appName=FYP";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("test");
    app.locals.db = db;
    console.log("Connected to MongoDB");

    const collection = await db.listCollections().toArray();
    if (!collection.map((coll) => coll.name).includes("users")) {
      await db.createCollection("users");
      console.log("Created users collection");
    }
    else
    {
      console.log("Users collection already exists");
    }
    if (!collection.map((coll) => coll.name).includes("posts")) {
      await db.createCollection("posts");
      console.log("Created posts collection");
    }
    else
    {
      console.log("Posts collection already exists");
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}
connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Use cors middleware to enable CORS

// View engine setup
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, 'views/layouts') }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

// User registration route
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

// User login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = req.app.locals.db;
    const users = db.collection('users');
    
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example route to get user info
app.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ user: req.userId });
});

app.post('/posts', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const db = req.app.locals.db;
    const posts = db.collection('posts');
    const newPost = { userId: req.userId, title, content, createdAt: new Date() };

    await posts.insertOne(newPost);
    res.status(201).json({ message: 'Post created successfully' });
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


// app.put('/posts/:id', verifyToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     const db = req.app.locals.db;
//     const posts = db.collection('posts');

//     const result = await posts.updateOne({ _id: ObjectId(id), userId: req.userId }, { $set: { title, content } });
//     if (result.matchedCount === 0) {
//       return res.status(404).json({ error: 'Post not found or not authorized' });
//     }

//     res.status(200).json({ message: 'Post updated successfully' });
//   } catch (err) {
//     console.error("Update post error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.delete('/posts/:id', verifyToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const db = req.app.locals.db;
//     const posts = db.collection('posts');

//     const result = await posts.deleteOne({ _id: ObjectId(id), userId: req.userId });
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: 'Post not found or not authorized' });
//     }

//     res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (err) {
//     console.error("Delete post error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));