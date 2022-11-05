/**
 * @fileoverview uses Mongoose to validate data and connects the server to the
 *               MongoDB database through Mongoose
 * Dependencies
 * - Mongoose to validate data and connect to the MongoDB database
 */

/* Imports of packages */
const mongoose = require("mongoose");

// load envioronment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// connefct server to mongoDB database
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Artefacts",
});

// Exit on error
const db = mongoose.connection.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

// Log to console once the database is open
db.once("open", async () => {
  console.log(`Mongo is connected!`)
});

// imports "User" mongoose model
require("./user");
