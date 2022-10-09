// libraries imported
const express = require('express') 
const jwtAuth = require('../utils/jwt') 
const multer = require('multer')
const upload = multer()

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// Get routes
userRouter.get('/get-artefact/:id', userController.getArtefact);
userRouter.get('/get-categories', jwtAuth, userController.getCategories)
userRouter.get('/get-associated', jwtAuth, userController.getAssociated)
userRouter.get('/data/:page', jwtAuth, userController.getPage)

// Search routes
userRouter.get('/search-category/:query/:page', jwtAuth, userController.searchCategory)
userRouter.get('/search-associated/:query/:page', jwtAuth, userController.searchAssociated)

// Login route
userRouter.post('/login', userController.loginUser)

// CRUD routes
userRouter.patch('/edit-artefact/:id', userController.editArtefact);
userRouter.delete('/delete-artefact/:id', jwtAuth, userController.deleteArtefact)
userRouter.post('/upload-image', jwtAuth, upload.single('image'), userController.addArtefact)

// removed routes
// userRouter.post('/change-password', userController.changePassword)
// userRouter.post('/register', userController.registerUser)
// userRouter.get('/data', jwtAuth, userController.allData);
// userRouter.post('/add-artefact', jwtAuth, upload.single("artefact-image"), userController.addArtefact),
// userRouter.get('/search-fuzzy/:query/:page', jwtAuth, userController.searchFuzzy)


// export Router object
module.exports = userRouter