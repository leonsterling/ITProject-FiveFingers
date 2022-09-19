// imports libraries and frameworks used for the project
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors')

// app runs on express.js
const app = express()
// trying
/* app uses cors to authenticate user
app.use(
    cors({
      origin: "https://sterlingfamilyartefacts.herokuapp.com/", // location of the react app were connecting to
      credentials: true,
    })
);
*/
app.use(cors());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','https://sterlingfamilyartefacts.herokuapp.com');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// app uses bodyParser to parse JSON objects from HTTP requests
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

app.use(express.json())

// router of app in server
const userRouter = require('./routers/userRouter')
app.use('/', userRouter)

// Tells the app to listen on port 5000 and logs that information to the console.
app.listen(process.env.PORT || 5100, () => {
    console.log('Server is alive!')
})

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// connect mongoose index in models folder
require('./models')

require('./utils/cloudinary')

module.exports = app

