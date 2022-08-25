const {User} = require('../models/user')

const registerUser = async (req, res) => {
    const user = new User(req.body);
    console.log(user)
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
    
}


// exports objects containing functions imported by router
module.exports = {
    registerUser,
    getUser
}