const { User } = require("../models/user");

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
  res.send(req.user);
};

// sample logout version, but still under development
/*
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).send({
        message: "Error found",
      err
    })
  console.log(err)
  }

  res.status(201).send({
    message: "Logout successfully",
    isValid: true
  });
  })
  console.log("backend logout")
  
}
*/

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
};
