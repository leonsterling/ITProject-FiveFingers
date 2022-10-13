/**
 * @fileoverview Handles form data from requests
 * Dependencies
 * - Multer for handling form data
 */

const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
});
