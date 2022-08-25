const {User} = require('../models/user')

const registerUser = async (req, res) => {
    const user = new User(req.body);
      await user.save().then((result) => {
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
}

const getUser = (req, res) => {
    console.log("Hi");
    res.send(req.user)
}


// exports objects containing functions imported by router
module.exports = {
    registerUser,
    getUser
}
