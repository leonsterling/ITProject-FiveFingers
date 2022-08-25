// libraries imported
const express = require('express') // for express-validator

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// Routes
userRouter.post('/register', userController.registerUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/getUser', userController.getUser)

// export Router object
module.exports = userRouter
