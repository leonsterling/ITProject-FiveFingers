// libraries imported
const express = require('express') // for express-validator
const jwtAuth = require('../jwt')

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// Routes
userRouter.post('/register', userController.registerUser)

userRouter.post('/login', userController.loginUser)
userRouter.delete('/logout', userController.logout)

userRouter.get('/getUser', jwtAuth, userController.getUser)

// export Router object
module.exports = userRouter
