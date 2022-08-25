const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      passport = require('passport')

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}

app.use(
    session({
    // The secret used to sign session cookies 
    secret: process.env.SESSION_SECRET || 'COMP300022',
    name: 'Sterling Artefacts', 
    saveUninitialized: true,
    resave: true
    })
)

app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);
app.use(cookieParser("COMP300022"));

const userRouter = require('./routers/userRouter')
app.use('/', userRouter)

// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(process.env.PORT || 5000, () => {
    console.log('Server is alive!')
})



require('./models')


