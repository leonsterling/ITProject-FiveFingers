// libraries and mongoose models imported
const { User, Artefact, Album, Tag, Image } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Create new Artefact Record
const registerArtefact = (req, res) => {
	let artefact = new Artefact(req.body);
	artefact
		.save()
		.then((artefact) => {
			res.send(artefact);
		})
		.catch((error) => {
			res.status(422).send("Failed to add artefact");
		});
};

// register new users (will be removed)
const registerUser = async (req, res) => {
  const user = new User(req.body);
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
        message: "Error upon creating user",
        error,
      });
    });

  console.log(user);
};

// gets users dashboard once successfully logged in
const getDashboard = async(req, res) => {

  const current_user = await User.findById(
    { _id: req.user.userId})
  
  // sample response status
  res.status(200).send({
    message: "Login Successful, hello user!",
    user: current_user
  });
  
};

// gets about page
const getAbout = (req, res) => {
  // sample response status
  res.status(200).send({
    message: "Welcome, pls log in!",
  });
};

// gets POST request, attempt to log-in user
const loginUser = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((checkPass) => {
          
          // invalid
          if (!checkPass) {
            return res.status(400).send({
              message: "Invalid password",
              isValid: false,
              error,
            });
          }

          //generate JWT token
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login Successful",
            username: user.username,
            isValid: true,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Error in loggin in",
            isValid: false,
            error,
          });
        });
    })

    // user is not registered in database
    .catch((error) => {
      res.status(404).send({
        message: "User doesn't exist",
        isValid: false,
        error,
      });
    });
};

// log-out user from current session
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
          isValid: false,
        });
      }
    });
  } else {
    res.end();
  }
};



// exports objects containing functions imported by router
module.exports = {
  registerArtefact,
  registerUser,
  logout,
  loginUser,
  getDashboard,
  getAbout,
};
