// imports libraries and frameworks used for the project
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors')

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
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

app.use(express.json())
app.use(cors())

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// router of app in server
const userRouter = require('./routers/userRouter')
app.use('/', userRouter)

// Tells the app to listen on port 5000 and logs that information to the console.
app.listen(process.env.PORT || 5100, () => {
    console.log('Server is alive!')
})

// connect mongoose index in models folder
require('./models')

require('./utils/cloudinary')
