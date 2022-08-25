// libraries imported
const express = require('express') // for express-validator
const passport = require('passport') // for passport and session

// create Router object
const userRouter = express.Router()

// import patient controller functions
const userController = require('../controllers/userController')

// Passport Authentication middleware
const isAuthenticated = (req, res, next) => {
    // patient not authenticated, redirect to patient login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // if successful, proceed to dashboard in controller
    return next()
}

// Routes
userRouter.post('/register', userController.registerUser)
userRouter.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
          res.status(500).send({
              message: "error found",
              err,
          });
      }
      if (!user) {
          res.status(201).send({
              test: "No user exists",
              isValid: false,
          });
          console.log(user)}
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.status(201).send({
              test: "User exists",
              isValid: true,
          });
          console.log(req.user);
        });
      }
    })(req, res, next);
  });


userRouter.get('/getUser', userController.getUser)


module.exports = userRouter
