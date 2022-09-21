// libraries and mongoose models imported
const { User, Artefact, Category, Associated } = require("../models/user");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");

const LIMIT = 4;

// login function
const loginUser = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((checkPass) => {
          // invalid
          if (!checkPass) {
            return res.status(500).send({
              message: "Login Unsuccessful",
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
          res.status(500).send({
            message: "Login Unsuccessful",
            isValid: false,
            error,
          });
        });
    })

    // user is not registered in database
    .catch((error) => {
      res.status(500).send({
        message: "Login Unsuccessful",
        isValid: false,
        error,
      });
    });
};

// search function
const searchBar = async (req, res) => {
  const query = req.params.query;
  Artefact.aggregate([
    {
      $search: {
        index: "associated_category_index",
        text: {
          path: ["associated.person", "category.category_name"],
          query: query,
        },
      },
    },
  ])
    .then((artefactRecords) => {
      if (artefactRecords.length == 0) {
        res.status(200).send({
          message: "Search query success with 0 artefacts",
          artefactRecords,
        });
      } else {
        res.status(200).send({
          message:
            "Search query success with " +
            artefactRecords.length +
            " artefacts",
          artefactRecords,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error upon searching",
        error,
      });
    });
};

// get artefacts function
const allData = (req, res) => {
  Artefact.find()
    .then((artefactRecords) => {
      res.status(200).send({
        message: "Successful in getting artefacts",
        artefactRecords,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error upon getting artefacts",
        error,
      });
    });
};

// get data based on page
const getPage = async (req, res) => {
  const pageNum = req.params.page;
  const totalArtefact = await Artefact.countDocuments();
  let totalPages = Math.floor(totalArtefact / LIMIT);
  let remainder = totalArtefact % LIMIT

  if (totalPages == 0) {
    totalPages = 1
  }

  if (remainder != 0) {
    totalPages += 1
  }

  let idx = (pageNum - 1) * LIMIT;

  await Artefact.find()
    .skip(idx)
    .limit(LIMIT)
    .then((dataInPage) => {
      const dataPerPage = dataInPage.length;

      if (dataPerPage > 0) {
        res.status(200).send({
          message: `Successfully retrieved page ${pageNum}`,
          dataPerPage,
          dataInPage,
          totalPages,
          totalArtefact
        });
      } else {
        res.status(200).send({
          message: "You ran out of artefacts!",
          dataPerPage,
          dataInPage,
          totalPages,
          totalArtefact
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error occured in getting pages",
        error,
      });
    });
};

// get categories function
const getCategories = (req, res) => {
  Category.find()
    .then((result) => {
      res.status(200).send({
        message: "Categories recieved successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error in getting categories",
        error,
      });
    });
};

// get associated function
const getAssociated = (req, res) => {
  Associated.find()
    .then((result) => {
      res.status(200).send({
        message: "Associated recieved successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error in getting categories",
        error,
      });
    });
};

// get an artefact functiono
const artefact_details = async (req, res) => {
  Artefact.findById(req.params.id)
    .then((result) => {
      res.status(200).send({
        message: "Artefact retrieved successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Artefact retrieved unsuccessfully",
        error,
      });
    });
};

// Create new Artefact Record
const registerArtefact = async (req, res) => {
  console.log(req.body.record.artefactImg);
  const image_data = await cloudinary.uploader.upload(
    req.body.record.artefactImg,
    {
      upload_preset: "sterling_family_account",
    }
  );

  const artefact = new Artefact({
    artefactName: req.body.record.artefactName,
    description: req.body.record.description,
    memories: req.body.record.memories,
    associated: null,
    category: null,
    location: req.body.record.location,
    "artefactImg.imgURL": image_data.url,
    "artefactImg.publicID": image_data.public_id,
  });

  await artefact
    .save()
    .then((result1) => {
      Category.findOne({ category_name: req.body.record.category })
        .then((result2) => {
          if (result2) {
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: result2 },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
          } else {
            const cat = new Category({
              category_name: req.body.record.category,
            });

            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: cat },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
            cat.save();
          }
        })
        .catch((error) => {});

      Associated.findOne({ person: req.body.record.associated })
        .then((result3) => {
          if (result3) {
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: result3 },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
          } else {
            const ass = new Associated({
              person: req.body.record.associated,
            });

            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: ass },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
            ass.save();
          }
        })
        .catch((error) => {});

      res.status(200).send({
        message: "Artefact registered successfully",
        result1,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error upon registering artefact",
        error,
      });
    });
};

// edit artefact function
const editArtefact = (req, res) => {
  Artefact.findByIdAndUpdate(
    { _id: req.params.id },
    {
      artefactName: req.body.record.artefactName,
      description: req.body.record.description,
      memories: req.body.record.memories,
      location: req.body.record.location,
    }
  )
    .then((result1) => {
      Category.findOne({ category_name: req.body.record.category })
        .then((result2) => {
          if (result2) {
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: result2 },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
          } else {
            const cat = new Category({
              category_name: req.body.record.category,
            });

            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: cat },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
            cat.save();
          }
        })
        .catch((error) => {});

      Associated.findOne({ person: req.body.record.associated })
        .then((result3) => {
          if (result3) {
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: result3 },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
          } else {
            const ass = new Associated({
              person: req.body.record.associated,
            });

            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: ass },
              },
              function (err, doc) {
                if (err) {
                } else {
                }
              }
            );
            ass.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error in edit",
            error,
          });
        });

      res.status(200).send({
        message: "Edit artefact successfully",
        result1,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error in edit",
        error,
      });
    });
};

const deleteArtefact = async (req, res) => {
  const artefact_id = req.params.id;
  const artefact_record = await Artefact.findOne({ _id: artefact_id });

  await Artefact.deleteOne({ _id: artefact_id })
    .then((result) => {
      console.log(result);
      console.log(artefact_record);
      cloudinary.uploader.destroy(
        artefact_record.artefactImg.publicID,
        function (error, result) {
          res.status(201).send({
            message: "Artefact deleted successfully",
            result,
            artefact_record,
          });
        }
      );
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Error upon deleting artefact",
        result,
      });
    });
};

const changePassword = async (req, res) => {
  // hash the password using bcrypt before saving to mongodb
  const hashed_pass = await bcrypt.hash(req.body.password, SALT_FACTOR);
  User.findOneAndUpdate(
    { username: req.body.username },
    { password: hashed_pass },
    function (err, doc) {
      if (err) {
        res.status(500).send({
          message: "Error upon changing password",
          err,
        });
      } else {
        res.status(201).send({
          message: "Password changed successfully",
          hashed_pass,
        });
      }
    }
  );
};

// Function to update patient's password
const updatePass = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsFound = validationResult(req).array();
      req.flash("errors", errorsFound);
      return res.redirect("/patient/change-password");
    }

    // hash the password using bcrypt before saving to mongodb
    const hashed_pass = await bcrypt.hash(req.body.password, SALT_FACTOR);
    Patient.findOneAndUpdate(
      { _id: req.user._id },
      { password: hashed_pass },
      function (err, doc) {
        if (err) {
          return res.redirect("/patient/404");
        } else {
        }
      }
    );

    return res.redirect("/patient/dashboard");
  } catch (err) {
    // error detected, renders patient error page
    return res.redirect("/patient/404");
  }
};

// register new users (will be removed)
const registerUser = async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then((result) => {
      res.status(200).send({
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

// exports objects containing functions imported by router
module.exports = {
  allData,
  loginUser,
  artefact_details,
  searchBar,
  getCategories,
  getAssociated,

  // not automatic testing yet
  getPage,
  registerArtefact,
  editArtefact,
  deleteArtefact,
  changePassword,

  // helper function, not part of requirement
  registerUser,
};
