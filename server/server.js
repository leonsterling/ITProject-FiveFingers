// imports libraries and frameworks used for the project
const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      passport = require('passport')

// app runs on express.js
const app = express()

// app uses cors to authenticate user
app.use(
    cors({
      origin: "http://localhost:3000", // location of the react app were connecting to
      credentials: true,
    })
);

// app uses bodyParser to parse JSON objects from HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app uses express-session for logged-in users
app.use(
    session({
    // The secret used to sign session cookies 
    secret: process.env.SESSION_SECRET || 'COMP300022',
    name: 'Sterling Artefacts', 
    saveUninitialized: true,
    resave: true
    })
)

// parses cookie for the session
app.use(cookieParser("COMP300022"));

// app uses passport to authenticate session
app.use(passport.authenticate('session'))

// router of app in server
const userRouter = require('./routers/userRouter')
app.use('/', userRouter)

// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(process.env.PORT || 5000, () => {
    console.log('Server is alive!')
})

// connect mongoose index in models folder
require('./models')
