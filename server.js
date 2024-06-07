const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const { MongoClient } = require('mongodb');


// Import handlers
const homeHandler = require('./controllers/home.js');

const app = express();
const port = process.env.PORT || 8080;
// const port = 8080;

// MongoDB connection setup
const uri = "mongodb+srv://kelseymoose346:opZ67GDDM8cB9gkB@fyp.b3mredm.mongodb.net/?retryWrites=true&w=majority&appName=FYP";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("chatroomDB");
    app.locals.db = db;
    console.log("Connected to MongoDB");

    const collection = await db.listCollections().toArray();
    if (!collection.map((coll) => coll.name).includes("rooms")) {
      await db.createCollection("rooms");
    }

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}
connectToDatabase();

//GIVEN CODE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
//MIGHT NEED .ENGINE
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//add calls here:

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));