// Load envioronment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
   }
   const mongoose = require('mongoose')
   // Connect to your mongo database using the MONGO_URL environment variable.
   // Locally, MONGO_URL will be loaded by dotenv from .env.
   // We've also used Heroku CLI to set MONGO_URL for our Heroku app before.
   mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Artefacts"
   })
   // Exit on error
   const db = mongoose.connection.on('error', err => {
    console.error(err);
    process.exit(1)
   })
  // Log to console once the database is open
    db.once('open', async () => {
    console.log(`Mongo connection started on ${db.host}:${db.port}`)
   })
   
   require('./user')
   
   