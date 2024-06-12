const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

async function register(req, res) {
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
}

async function login(req, res) {
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
}

function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
}

function profile(req, res) {
  if (req.session.user) {
    res.json({ username: req.session.user.username });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  register,
  login,
  logout,
  profile
};
