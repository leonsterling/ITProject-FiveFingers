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
userRouter.get("/data", jwtAuth, userController.allData);
userRouter.get("/:id", userController.artefact_details);


// POST routes for Login activities
userRouter.post('/register', userController.registerUser)
userRouter.post('/login', userController.loginUser)

// POST route to register Artefact
userRouter.post('/add-artefact', jwtAuth, upload.single("artefact-image"), userController.registerArtefact),

//PATCH route to edit artefact
userRouter.patch("/:id", userController.editArtefact);

// DELETE route
userRouter.delete('/logout', userController.logout),
userRouter.delete('/delete-artefact', jwtAuth, userController.deleteArtefact)

// export Router object
module.exports = userRouter
