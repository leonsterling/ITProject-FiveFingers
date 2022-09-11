// libraries imported
const express = require('express') 
const jwtAuth = require('../utils/jwt') 
const upload = require('../utils/multer')

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// GET routes
userRouter.get('/dashboard', jwtAuth, userController.getDashboard)
userRouter.get("/:id", userController.artefact_details);
userRouter.get('/search-artefacts/:query', jwtAuth, userController.searchBar)

// POST routes for Login activities
userRouter.post('/register', userController.registerUser)
userRouter.post('/login', userController.loginUser)
userRouter.post('/change-password', userController.changePassword)

// POST route to register, edit or delete artefacts
userRouter.post('/add-artefact', jwtAuth, upload.single("artefact-image"), userController.registerArtefact),
userRouter.post('/edit-artefact', jwtAuth, userController.editArtefact),

// DELETE route
userRouter.delete('/logout', userController.logout),
userRouter.delete('/delete-artefact', jwtAuth, userController.deleteArtefact)

// export Router object
module.exports = userRouter
