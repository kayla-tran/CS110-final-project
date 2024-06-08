const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');  // For password hashing
const session = require('express-session');
const cors = require('cors'); // Import cors middleware

// Import handlers
const homeHandler = require('./controllers/home.js');

const app = express();
const port = process.env.PORT || 8080;

// MongoDB connection setup
const uri = "mongodb+srv://kelseymoose346:opZ67GDDM8cB9gkB@fyp.b3mredm.mongodb.net/?retryWrites=true&w=majority&appName=FYP";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("accounts");
    app.locals.db = db;
    console.log("Connected to MongoDB");

    const collection = await db.listCollections().toArray();
    if (!collection.map((coll) => coll.name).includes("users")) {
      await db.createCollection("users");
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
app.use(session({
  // secret: 'your_secret_key', // Remove or comment out this line
  resave: false,
  saveUninitialized: true
}));
app.use(cors()); // Use cors middleware to enable CORS

// View engine setup
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, 'views/layouts') }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware for session-based authentication
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

// User registration route
app.post('/register', async (req, res) => {
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
});

// User login route
app.post('/login', async (req, res) => {
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

  req.session.user = user;
  res.status(200).json({ message: 'Login successful' });
});

// Example route to get user info
app.get('/profile', isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.session.user });
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
