const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
});