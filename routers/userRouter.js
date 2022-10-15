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
userRouter.get('/data/:page', jwtAuth, userController.getPage)
userRouter.get('/get-artefact/:id', jwtAuth, userController.getArtefactDetails);
userRouter.get('/get-categories', jwtAuth, userController.getCategories)
userRouter.get('/get-associated', jwtAuth, userController.getAssociated)

// GET search routes
userRouter.get('/search-category/:query/:page', jwtAuth, userController.searchCategory)
userRouter.get('/search-associated/:query/:page', jwtAuth, userController.searchAssociated)

// POST routes for login
userRouter.post('/login', userController.loginUser)

// POST route to register Artefact
userRouter.post('/add-artefact', jwtAuth, upload.single("artefact-image"), userController.registerArtefact),

// PATCH route to edit artefact
userRouter.patch('/edit-artefact/:id', jwtAuth, userController.editArtefact);

// DELETE route to delete artefact
userRouter.delete('/delete-artefact/:id', jwtAuth, userController.deleteArtefact)


// export Router object
module.exports = userRouter
