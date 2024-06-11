// const express = require('express');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const { MongoClient, ObjectId } = require('mongodb');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 8080;
// const uri = "mongodb+srv://kelseymoose346:opZ67GDDM8cB9gkB@fyp.b3mredm.mongodb.net/?retryWrites=true&w=majority&appName=FYP";
// const client = new MongoClient(uri);

// const session = require('express-session');

// app.use(session({
//   secret: 'secret-key-1234567890',
//   resave: false,
//   saveUninitialized: false
// }));


// async function connectToDatabase() {
//   try {
//     await client.connect();
//     const db = client.db("test");
//     app.locals.db = db;
//     console.log("Connected to MongoDB");

//     const collections = await db.listCollections().toArray();
//     if (!collections.map(coll => coll.name).includes("users")) {
//       await db.createCollection("users");
//       console.log("Created users collection");
//     }
//     if (!collections.map(coll => coll.name).includes("posts2")) {
//       await db.createCollection("posts2");
//       console.log("Created posts collection");
//     }
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//     process.exit(1);
//   }
// }
// connectToDatabase();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors());

// app.post('/auth/google', async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log('Received email:', email);
//     // Perform authentication logic here, then send response
//     res.status(200).json({ message: 'Authentication successful', email });
//   } catch (err) {
//     console.error("Google OAuth error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// app.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const db = req.app.locals.db;
//     const users = db.collection('users');
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = { username, password: hashedPassword };

//     const existingUser = await users.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     await users.insertOne(newUser);
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // app.post('/login', async (req, res) => {
// //   try {
// //     const { username, password } = req.body;
// //     const db = req.app.locals.db;
// //     const users = db.collection('users');
// //     const user = await users.findOne({ username });

// //     if (!user || !await bcrypt.compare(password, user.password)) {
// //       return res.status(400).json({ error: 'Invalid username or password' });
// //     }


// //     res.status(200).json({ message: 'Login successful'});

// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // app.post('/login', async (req, res) => {
// //   try {
// //     const { username, password } = req.body;
// //     const db = req.app.locals.db;
// //     const users = db.collection('users');
// //     const user = await users.findOne({ username });

// //     if (!user || !await bcrypt.compare(password, user.password)) {
// //       return res.status(400).json({ error: 'Invalid username or password' });
// //     }

// //     res.status(200).json({ message: 'Login successful', username: user.username });

// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });


// // app.post('/logout', (req, res) => {
// //   res.status(200).json({ message: 'Logout successful' });
// // });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Validate username and password
//   if (isValidUser(username, password)) {
//     // Create a session and store user data
//     req.session.user = { username: username };
//     res.json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// app.get('/profile', (req, res) => {
//   if (req.session.user) {
//     res.json({ username: req.session.user.username });
//   } else {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// });


// app.post('/logout', (req, res) => {
//   req.session.destroy();
//   res.json({ message: 'Logout successful' });
// });



// // app.get('/profile', async (req, res) => {
// //   try {
    
// //     const db = req.app.locals.db;
// //     const users = db.collection('users');
// //     const user = await users.findOne({ _id: new MongoClient.ObjectId(req.userId) });

// //     if (!user) {
// //       return res.status(404).json({ error: 'User not found' });
// //     }

// //     res.status(200).json({ user: req.userId, username: user.username });

// //   } catch (err) {
// //     console.error("Profile error:", err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });



// app.post('/posts', async (req, res) => {
//   try {
//     const { username, content, image, caption } = req.body || {};

//     const db = req.app.locals.db;
//     const posts = db.collection('posts2');

//     const newPost = { username, content, image, caption, createdAt: new Date() };

//     await posts.insertOne(newPost);
//     res.status(201).json({ message: 'Post created successfully', post: newPost });
//   } catch (err) {
//     console.error("Create post error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// app.get('/posts', async (req, res) => {
//   try {
//     const db = req.app.locals.db;
//     const posts = db.collection('posts2');
//     const allPosts = await posts.find().toArray();
//     res.status(200).json(allPosts);
//   } catch (err) {
//     console.error("Get posts error:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(session({
  secret: 'secret-key-1234567890',
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
    if (!collections.map(coll => coll.name).includes("posts2")) {
      await db.createCollection("posts2");
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

//============POSTS=============

app.post('/posts', async (req, res) => {
  try {
    const { username, content, image, caption } = req.body || {};
    const db = req.app.locals.db;
    const posts = db.collection('posts2');
    const newPost = { username, content, image, caption, createdAt: new Date() };

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
    const posts = db.collection('posts2');
    const allPosts = await posts.find().toArray();
    res.status(200).json(allPosts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
