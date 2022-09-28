/**
 * @fileoverview Integrates cloudinary with the server-side
 * Dependencies
 * - Cloudinary for handling image data
 */

/* Imports of packages */
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

/* Uses the provided environment variables (in ./.env)
 * to authenticate with Cloundinary */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = { cloudinary };
