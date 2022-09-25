const mongoose = require('mongoose')

// load envioronment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
   
// connect server to mongoDB database
mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1', {
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
  console.log(`Mongo is connected!\nStarted on ${db.host}:${db.port}`)
})

// imports "User" mongoose model
require('./user')
   
   