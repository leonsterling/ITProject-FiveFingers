const { User } = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  await user
    .save()
    .then((result) => {
      res.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      });
    });
};

const getUser = (req, res) => {
  res.status(200).send({
    message: "Login Successful",
    user: req.user
  });
};

const loginUser = (req, res) => {
 
  User.findOne({ username: req.body.username }).then((user) => {
      bcrypt.compare(req.body.password, user.password).then((checkPass) => {

          if(!checkPass) {
            return res.status(400).send({
              message: "Invalid password",
              isValid: false,
              error,
            });
          }

          //generate JWT token
          const token = jwt.sign(
            { userId: user._id,
              username: user.username
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login Successful",
            username: user.username,
            isValid: true,
            token,
          });
        }).catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            isValid: false,
            error,
          });
        });
    }).catch((e) => {
      res.status(404).send({
        message: "User doesn't exist",
        isValid: false,
        e,
      });
    });
}

const logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send({
          message: "Unable to log out, error occured",
        });
      } else {
        res.status(201).send({
          message: "Logout successful",
          isValid: false
        });
      }
    });
  } else {
    res.end();
  }
};

// exports objects containing functions imported by router
module.exports = {
  registerUser,
  getUser,
  logout,
  loginUser
};
