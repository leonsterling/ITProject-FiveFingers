// import libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");
const fs = require("fs");

// import mongoose models
const { User, Artefact, Category, Associated } = require("../models/user");

// constants
const SALT_FACTOR = 10;
const LIMIT = 4;

// helper functions
const associatedFunc = (query, idx) =>
  Artefact.aggregate([
    {
      $search: {
        index: "associated_index",
        text: {
          path: ["associated.person"],
          query: query,
        },
      },
    },
  ]);

const categoryFunc = (query, idx) =>
  Artefact.aggregate([
    {
      $search: {
        index: "category_index",
        text: {
          path: ["category.category_name"],
          query: query,
        },
      },
    },
  ]);

// login function for route: '/login'
const loginUser = (req, res) => {
  // trieds to find an existing user with the username
  User.findOne({ username: req.body.username })
    .then((user) => {
      // user with username found, now checks password
      bcrypt
        .compare(req.body.password, user.password)
        .then((checkPass) => {
          // incorrect password
          if (!checkPass) {
            return res.status(500).send({
              message: "Login Unsuccessful",
              isValid: false,
              error,
            });
          }
          // correct password, now generate JWT token
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
    // incorrect username
    .catch((error) => {
      res.status(500).send({
        message: "Login Unsuccessful",
        isValid: false,
        error,
      });
    });
};

// basic search function for route: '/search-artefacts/:query'
const searchFuzzy = async (req, res) => {
  // tries to find artefacts that matches the query
  // search index is based on <category> and <associated> fields
  Artefact.aggregate([
    {
      $search: {
        index: "fuzzy_index",
        text: {
          path: [
            "associated.person",
            "category.category_name",
            "artefactName",
            "description",
          ],
          query: req.params.query,
          fuzzy: {
            maxEdits: 2,
            maxExpansions: 250,
          },
        },
      },
    },
  ])
    .then((artefactRecords) => {
      if (artefactRecords.length == 0) {
        // no artefact matchd the query
        res.status(200).send({
          message: "Search query success with 0 artefacts",
          artefactRecords,
        });
      } else {
        // 1 or more artefacts matches the query
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

const searchCategory = (req, res) => {
  const query = req.params.query;
  const pageNum = req.params.page;

  let idx = (pageNum - 1) * LIMIT;
  categoryFunc(query)
    .then((artefactRecords) => {
      // console.log(artefactRecords)
      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matchd the query
        res.status(200).send({
          message: "Search query success with 0 artefacts ",
          totalSearched,
        });
      } else {
        /*
        // 1 or more artefacts matches the query
        res.status(200).send({
          message:
            "Associated query success with " +
            artefactRecords.length +
            " artefacts",
          artefactRecords,
        });
        */
        categoryFunc(query)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            const totalArtefact = searched.length;
            let totalPages = Math.ceil(totalSearched / LIMIT);

            res.status(200).send({
              message: `Successfully retrieved page ${pageNum}`,
              totalPages,
              searched,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Error upon searching",
              error,
            });
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

const searchAssociated = (req, res) => {
  const query = req.params.query;
  const pageNum = req.params.page;

  let idx = (pageNum - 1) * LIMIT;
  Artefact.aggregate([
    {
      $search: {
        index: "associated_index",
        text: {
          path: ["associated.person"],
          query: query,
        },
      },
    },
  ])
    .then((artefactRecords) => {
      // console.log(artefactRecords)
      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matchd the query
        res.status(200).send({
          message: "Search query success with 0 artefacts ",
          totalSearched,
        });
      } else {
        /*
        // 1 or more artefacts matches the query
        res.status(200).send({
          message:
            "Associated query success with " +
            artefactRecords.length +
            " artefacts",
          artefactRecords,
        });
        */
        associatedFunc(query, idx)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            const totalArtefact = searched.length;
            let totalPages = Math.ceil(totalSearched / LIMIT);

            res.status(200).send({
              message: `Successfully retrieved page ${pageNum}`,
              totalPages,
              searched,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Error upon searching",
              error,
            });
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

// get all artefacts function for route: '/data'
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

// get all categories function for route: '/get-categories'
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

// get all associated function for route: '/get-associated'
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

// get a single artefact function for route: '/get-artefact/:id'
const artefact_details = async (req, res) => {
  // finds an artefact corresponding to a MongoDB record ID
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

// register artefact function for route: '/add-artefact'
const registerArtefact = async (req, res) => {
  // upload image to Cloudinary
  const image_data = await cloudinary.uploader.upload(
    req.body.record.artefactImg,
    {
      upload_preset: "sterling_family_account",
      allowed_formats: ["jpeg", "jpg", "png"],
      format: "jpg",
    }
  );

  // create a new 'Artefact' record
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

  // store artefact in database
  artefact
    .save()
    .then((result1) => {
      // checks if category exists in database
      Category.findOne({ category_name: req.body.record.category })
        .then((result2) => {
          if (result2) {
            // stores the existing category object in the artefact record
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: result2 },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );
          } else {
            // creates a new Category record
            const newCategory = new Category({
              category_name: req.body.record.category,
            });

            // updates category of artefact
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: newCategory },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );

            // stores new category in database
            newCategory.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error upon registering artefact",
            err,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.record.associated })
        .then((result3) => {
          if (result3) {
            // stores the existing associated object in the artefact record
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: result3 },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );
          } else {
            // create a new Associated record
            const newAssociated = new Associated({
              person: req.body.record.associated,
            });

            // updates associated of artefact
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: newAssociated },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );

            // stores new associated in database
            newAssociated.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error upon registering artefact",
            err,
          });
        });

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

// edit artefact function for route: '/edit-artefact/:id'
const editArtefact = (req, res) => {
  // edits all artefact fields (except image)
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
      // checks if category exists in database
      Category.findOne({ category_name: req.body.record.category })
        .then((result2) => {
          if (result2) {
            // stores the existing category object in the artefact record
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: result2 },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );
          } else {
            // creates a new Category record
            const newCategory = new Category({
              category_name: req.body.record.category,
            });

            // updates category of artefact
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: newCategory },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );

            // stores new category in database
            newCategory.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error upon edit artefact",
            err,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.record.associated })
        .then((result3) => {
          if (result3) {
            // stores the existing associated object in the artefact record
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: result3 },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon edit artefact",
                    err,
                  });
                } else {
                }
              }
            );
          } else {
            // create a new Associated record
            const newAssociated = new Associated({
              person: req.body.record.associated,
            });

            // updates associated of artefact
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: newAssociated },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon edit artefact",
                    err,
                  });
                } else {
                }
              }
            );

            // stores new associated in database
            newAssociated.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error upon edit artefact",
            err,
          });
        });

      res.status(200).send({
        message: "Edit artefact successfully",
        result1,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error upon edit artefact",
        error,
      });
    });
};

// delete artefact function for route: '/delete-artefact/:id'
const deleteArtefact = async (req, res) => {
  const artefact_id = req.params.id;
  const artefact_record = await Artefact.findOne({ _id: artefact_id });

  // deletes artefact with the corresponding MongoDB record ID
  Artefact.deleteOne({ _id: artefact_id })
    .then(() => {
      /*
      // removes artefact image stored in Cloudinary
      cloudinary.uploader.destroy(
        artefact_record.artefactImg.publicID,
        function (error, result) {
          res.status(200).send({
            message: "Artefact deleted successfully",
            result,
            artefact_record,
          });
        }
      );
      */
      const pathFile = __dirname + artefact_record.artefactImg.path;

      fs.unlink(pathFile, function(err) {
        if (err) console.log(err)
        else {
        }
      })

      res.status(200).send({
        message: "Delete artefact successfully"
      });

    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Error upon deleting artefact",
        result,
      });
    });
};

// change password function for route: '/change-password'
const changePassword = async (req, res) => {
  // hash the password using bcrypt before saving to mongodb
  const hashed_pass = await bcrypt.hash(req.body.password, SALT_FACTOR);

  // updates the password (hashed) of the user
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
        res.status(200).send({
          message: "Password changed successfully",
        });
      }
    }
  );
};

// register new users
// (HELPER FUNCTION, WILL BE REMOVED)
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

// get data based on page for route: '/data/:page'
// (NO AUTOMATIC TESTING YET)
const getPage = async (req, res) => {
  // current page
  const pageNum = req.params.page;

  // total count of all artefacts
  const totalArtefact = await Artefact.countDocuments();

  let totalPages = Math.ceil(totalArtefact / LIMIT);

  let idx = (pageNum - 1) * LIMIT;

  await Artefact.find()
    .sort({ _id: -1 })
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
          totalArtefact,
        });
      } else {
        res.status(200).send({
          message: "You ran out of artefacts!",
          dataPerPage,
          dataInPage,
          totalPages,
          totalArtefact,
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

const uploadImage = (req, res) => {
  /*
  const image_data = await cloudinary.uploader.upload(
    req.body.record.artefactImg,
    {
      upload_preset: "sterling_family_account",
      allowed_formats: ["jpeg", "jpg", "png"],
      format: "jpg",
    }
  );
  */

  console.log(req.body);
  // console.log('writing file...', base64Data);
  const path = `/../images/${Date.now()}_${req.body.nameImg}`;
  const pathFile = __dirname + path;

  // console.log(pathFile)
  fs.writeFile(
    pathFile,
    req.body.artefactImg.split(",")[1],
    { encoding: "base64" },
    function (err) {
      if (err) console.log(err);
      else {
      }
      /*
      else {
        fs.unlink(pathFile, function(err) {
          if (err) console.log(err)
          else {

          }
        })
      }
      */
    }
  );

  // create a new 'Artefact' record
  const artefact = new Artefact({
    artefactName: req.body.artefactName,
    description: req.body.description,
    memories: req.body.memories,
    associated: null,
    category: null,
    location: req.body.location,
    "artefactImg.imgURL": req.body.artefactImg,
    "artefactImg.type": req.body.typeImg,
    "artefactImg.path": path,
  });

  // store artefact in database
  artefact
    .save()
    .then((result1) => {
      // checks if category exists in database
      Category.findOne({ category_name: req.body.category })
        .then((result2) => {
          if (result2) {
            // stores the existing category object in the artefact record
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: result2 },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );
          } else {
            // creates a new Category record
            const newCategory = new Category({
              category_name: req.body.category,
            });

            // updates category of artefact
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { category: newCategory },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );

            // stores new category in database
            newCategory.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error upon registering artefact",
            err,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.associated })
        .then((result3) => {
          if (result3) {
            // stores the existing associated object in the artefact record
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: result3 },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );
          } else {
            // create a new Associated record
            const newAssociated = new Associated({
              person: req.body.associated,
            });

            // updates associated of artefact
            Artefact.updateOne(
              { _id: result1._id },
              {
                $set: { associated: newAssociated },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            );

            // stores new associated in database
            newAssociated.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error upon registering artefact",
            err,
          });
        });

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

// exports objects containing functions imported by router
module.exports = {
  allData,
  loginUser,
  artefact_details,
  getCategories,
  getAssociated,
  registerArtefact,
  editArtefact,
  deleteArtefact,
  changePassword,

  // no automatic testing yet
  getPage,
  uploadImage,

  // helper function, not part of requirement
  registerUser,

  // new search functions
  searchCategory,
  searchAssociated,
  searchFuzzy,
};
