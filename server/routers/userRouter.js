// libraries imported
const express = require('express') 
const jwtAuth = require('../jwt') 

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// GET routes
userRouter.get('/about', userController.getAbout)
userRouter.get('/dashboard', jwtAuth, userController.getDashboard)

// POST routes for Login activities
userRouter.post('/register', userController.registerUser)
userRouter.post('/login', userController.loginUser)

// POST route for registering artefacts
userRouter.post('/recordArtefact', userController.registerArtefact),


// DELETE route
userRouter.delete('/logout', userController.logout)

// export Router object
module.exports = userRouter
