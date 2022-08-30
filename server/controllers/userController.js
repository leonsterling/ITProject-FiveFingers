// libraries and mongoose models imported
const { User, Artefact, Album, Tag, Image } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


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

const addArtefact = async (req, res) => {
  const artefactData = new Artefact({
    artefact_name: "artefact 2",
    artefact_description: "my second ever artefact",
    artefact_location: "singapore",
    artefact_date_origin: new Date(),
    artefact_images: null,
    artefact_tags: null,
  });

  User.updateOne(
    { username: "vincent" },
    { $push: { artefact_list: artefactData } },
    function (err, doc) {
      if (err) return null;
      else {
      }
    }
  );

  await artefactData
    .save()
    .then((result) => {
      res.status(201).send({
        message: "Artefact created successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error upon creating artefact",
        error,
      });
    });
};

const updateArtefact = (req, res) => {
  const loc = "iran";

  User.updateOne(
    { username: "vincent", "artefact_list.artefact_name": "artefact 2" },
    { $set: { "artefact_list.$.artefact_location": loc } },
    function (err, doc) {
      if (err) {
        res.status(500).send({
          message: "Error upon updating artefact 1",
          err,
      })}
      else {
        Artefact.updateOne(
          {artefact_name: "artefact 2" },
          { $set: { artefact_location: loc } },
          function (err, doc) {
            if (err) {
              res.status(500).send({
                message: "Error upon updating artefact 1",
                err,
            })}
            else {
              res.status(201).send({
                message: "Artefact updated successfully"
              });
            }
          }
        )
      }
    }
  )

};

// exports objects containing functions imported by router
module.exports = {
  registerUser,
  logout,
  loginUser,
  getDashboard,
  getAbout,
  addArtefact,
  updateArtefact,
};
