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
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists")
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
          });
        }
      })(req, res, next);
      
  });

userRouter.get('/getUser', userController.getUser)

// export Router object
module.exports = userRouter
