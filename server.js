/**
 * @fileoverview The starting point of the server file, used to securely serve
 * the dynamically stored files to the front-end upon request
 * Dependencies:
 * - ExpressJS to build a RESTful API on top of Node.js
 * - body-parser to parse HTTP request methods
 * - CORS to safely transfer data between restricted resources (the artefacts)
 *   to the font-end
 */

// imports libraries and frameworks used for the project
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors')

// app runs on express.js
const app = express()

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
app.use('https://sterlingfamilyartefacts.herokuapp.com', userRouter)

// Tells the app to listen on port 5000 and logs that information to the console.
app.listen(process.env.PORT || 5100, () => {
    console.log('Server is alive!')
})

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.join(__dirname, "client/build")));

// For any request that doesn't
// match one above, send back React's index.html file.
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// connect mongoose index in models folder
require('./models')

require('./utils/cloudinary')

module.exports = app

