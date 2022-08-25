// libraries imported
const express = require('express') // for express-validator
const passport = require('../passport')

// create userRouter object
const userRouter = express.Router()

// import user controller functions
const userController = require('../controllers/userController')

// Routes
userRouter.post('/register', userController.registerUser)

userRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
          res.status(500).send({
            message: "Error found",
            err
          })
          console.log (err)
        }
        
        if (!user) {
          res.status(201).send({
            message: "No User Exists",
            isValid: false
          })
          console.log(user)
        }

        else {
          req.logIn(user, (err) => {
            if (err) {
              res.status(500).send({
                message: "Error found",
              err
            })
          console.log (err)
          }

          res.status(201).send({
            message: "Successfully Authenticated",
            isValid: true
          });
          console.log(req.user);
          });
        }
      })
      
      // callback function called next
      (req, res, next);
      
  });

userRouter.post('/logout', userController.logout)
userRouter.get('/getUser', userController.getUser)

// export Router object
module.exports = userRouter
