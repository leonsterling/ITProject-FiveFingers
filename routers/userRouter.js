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

// POST routes for Login activities
userRouter.post('/register', userController.registerUser)
userRouter.post('/login', userController.loginUser)
userRouter.post('/change-password', userController.changePassword)

// POST route to register Artefact
userRouter.post('/add-artefact', jwtAuth, upload.single("artefact-image"), userController.registerArtefact),

//PATCH route to edit artefact
userRouter.patch('/edit-artefact/:id', userController.editArtefact);

// DELETE route
userRouter.delete('/delete-artefact/:id', jwtAuth, userController.deleteArtefact)

// export Router object
module.exports = userRouter
