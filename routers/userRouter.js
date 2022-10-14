/**
 * @fileoverview Handles which methods/functions to call whenever a route
 *               is requested
 * Dependencies
 * - ExpressJS to build a RESTful API on top of Node.js
 * - JSON Web Token to send URL-safe claims between the server and client-side
 *   code
 * - Multer for handling form data
 */

// libraries imported
const express = require('express') 
const jwtAuth = require('../utils/jwt') 
const upload = require('../utils/multer')

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// GET routes
userRouter.get('/data', jwtAuth, userController.allData);
userRouter.get('/get-artefact/:id', userController.artefact_details);
userRouter.get('/search-artefacts/:query', jwtAuth, userController.searchBar)
userRouter.get('/get-categories', jwtAuth, userController.getCategories)
userRouter.get('/get-associated', jwtAuth, userController.getAssociated)

// POST routes for login
userRouter.post('/register', userController.registerUser)
userRouter.post('/login', userController.loginUser)
userRouter.post('/change-password', userController.changePassword)

// POST route to register Artefact
userRouter.post('/add-artefact', jwtAuth, upload.single("artefact-image"), userController.registerArtefact),

// PATCH route to edit artefact
userRouter.patch('/edit-artefact/:id', userController.editArtefact);

// DELETE route to delete artefact
userRouter.delete('/delete-artefact/:id', jwtAuth, userController.deleteArtefact)

// testing pagination (NO AUTOMATIC TESTING YET)
userRouter.get('/data/:page', jwtAuth, userController.getPage)

// export Router object
module.exports = userRouter
