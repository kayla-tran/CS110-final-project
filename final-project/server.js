const express = require('express');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const uri = "mongodb+srv://kelseymoose346:opZ67GDDM8cB9gkB@fyp.b3mredm.mongodb.net/?retryWrites=true&w=majority&appName=FYP";
const client = new MongoClient(uri);

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');

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

//===============ROUTES===================

// User routes
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.get('/profile', userController.profile);

// Post routes
app.post('/posts', postController.createPost);
app.get('/posts', postController.getPosts);
app.delete('/profile/posts/:postId', postController.deletePost);

// Comment routes
app.post('/posts/:postId', commentController.addComment);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
