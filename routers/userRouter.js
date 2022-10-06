// libraries imported
const express = require('express') 
const jwtAuth = require('../utils/jwt') 
const imageUpload = require('../utils/imageUpload')
const multer = require('multer')

let upload = multer()

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// GET routes
userRouter.get('/data', jwtAuth, userController.allData);
userRouter.get('/get-artefact/:id', userController.artefact_details);
userRouter.get('/get-categories', jwtAuth, userController.getCategories)
userRouter.get('/get-associated', jwtAuth, userController.getAssociated)

// GET search routes
userRouter.get('/search-category/:query/:page', jwtAuth, userController.searchCategory)
userRouter.get('/search-associated/:query/:page', jwtAuth, userController.searchAssociated)
userRouter.get('/search-fuzzy/:query/:page', jwtAuth, userController.searchFuzzy)

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

// testing local image upload (NOT AUTOMATIC TESTING YET)
userRouter.post('/upload-image', jwtAuth, upload.array(), userController.uploadImage)

// export Router object
module.exports = userRouter