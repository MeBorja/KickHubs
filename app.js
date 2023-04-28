const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: ".env" });
const authRoutes = require("./routes/authRoutes")
const cookiePraser = require('cookie-parser');
const { requireAuth, checkUser, checkAdmin } = require('./middleware/authMiddleware');
const { collection } = require('./models/Score');


const app = express();

(async () => {
  try {
    
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    app.listen(3000)
    let users = (await collection.find().sort({score: -1}).toArray())
    console.log('Connected to DB.');
    setInterval(async () => {
        users = await collection.find().sort({score: -1}).toArray()
      app.get('/scoreboard', requireAuth,  (req, res) => res.render('scoreboard', {player: users}));
    }, 5000)

    app.use(cookiePraser())
    
    app.use(express.static('public'));
    app.use(express.json())
    app.set('view engine', 'ejs');
    
    app.get('*',checkUser )
    app.get('/rules',requireAuth, (req, res) => res.render('rules'))
    app.get('/login',  (req, res) => res.render('login'))
    app.get('/signup',  (req, res) => res.render('signup'))
    app.get('/',   (req, res) => res.render('home'));
    app.get('/scoreboard', requireAuth,  (req, res) => res.render('scoreboard', {player: users}));
    app.get('/veileder', checkAdmin, requireAuth, (req, res) => res.render('veileder'))
    app.get('/game',requireAuth, checkUser, (req, res) => res.render('game') )
    app.get('/404',checkUser ,(req, res) => res.render('404'))
    app.get('/gamerules', requireAuth, (req, res) => res.render('gamerules'))
    app.use(authRoutes)

   
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
// middleware;

// view engine


// database connection



// routes
