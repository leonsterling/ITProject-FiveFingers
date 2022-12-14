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
      path = require('path')

// app runs on express.js
const app = express()

// app uses cors HTTP protocol
app.use(cors());

// app uses bodyParser to parse JSON objects from HTTP requests
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json())

// router of app in server
const userRouter = require('./routers/userRouter')
app.use('/', userRouter)

// fetch image locally
app.use('/getImage', express.static(path.join(__dirname, 'storage')))

// Tells the app to listen on port 5000 and logs that information to the console.
app.listen(process.env.PORT || 5100, () => {
    console.log('Server is alive!')
})

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


module.exports = app

