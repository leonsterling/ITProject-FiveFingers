/**
 * @fileoverview Uses the parsed request, transforms it into logic based on the
 *               provided request (and any additional required data) and sends
 *               an appropriate response, based on what the client requested
 * Dependencies
 * - BCrypt to implement encrypted security
 * - JSON Web Token to send URL-safe claims between the server and client-side
 *   code
 * - Cloudinary to handle image files
 */

/* Imports of packages */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

/* Imports of local modules */
const {
  User,
  Artefact,
  Category,
  Associated,
  Artefact_Local,
} = require("../models/user");

/* Main implementation */
const SALT_FACTOR = 10;

const LIMIT = 4;

const HOST = "http://localhost";
const PORT = 3000;
const URL = `${HOST}:${PORT}`;

// helper functions
const associatedIndex = (query, idx) =>
  Artefact_Local.aggregate([
    {
      $search: {
        index: "associated_index",
        phrase: {
          path: ["associated.person"],
          query: query,
        },
      },
    },
  ]);

const categoryIndex = (query, idx) =>
  Artefact_Local.aggregate([
    {
      $search: {
        index: "category_index",
        phrase: {
          path: ["category.category_name"],
          query: query,
        },
      },
    },
  ]);

// login function for route: '/login'
const loginUser = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password, (err, checkPass) => {
          if (err) {
            return res.status(500).send({
              message: "Login Unsuccessful",
              isValid: false,
              err,
            });
          }
          
          
          if (!checkPass) {
            return res.status(500).send({
              message: "Invalid Password",
              isValid: false,
              err,
            });
          }

          else {
            //generate JWT token
            const token = jwt.sign(
              { userId: user._id, username: user.username },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
            return res.status(200).send({
              message: "Login Successful",
              username: user.username,
              isValid: true,
              token,
            });
          }
        })
    })

    // user is not registered in database
    .catch((error) => {
      res.status(500).send({
        message: "Invalid Username",
        isValid: false,
        error,
      });
    });
};

const searchCategory = (req, res) => {
  const query = req.params.query;
  const pageNum = req.params.page;

  let idx = (pageNum - 1) * LIMIT;
  categoryIndex(query)
    .then((artefactRecords) => {
      // console.log(artefactRecords)
      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matchd the query
        res.status(200).send({
          message: "Search query success with 0 artefacts",
          totalSearched,
        });
      } else {
        categoryIndex(query)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            const totalPages = Math.ceil(totalSearched / LIMIT);

            res.status(200).send({
              message:
                "Search query success with " + searched.length + " artefacts",
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
  associatedIndex(query)
    .then((artefactRecords) => {
      // console.log(artefactRecords)
      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matchd the query
        res.status(200).send({
          message: "Search query success with 0 artefacts",
          totalSearched,
        });
      } else {
        associatedIndex(query, idx)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            const totalPages = Math.ceil(totalSearched / LIMIT);

            res.status(200).send({
              message:
                "Search query success with " + searched.length + " artefacts",
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
  Artefact_Local.find()
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

/**
 * Sends a response containing a list of all Category objects
 * @param {Request} req
 * @param {Response} res
 */
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

/**
 * Sends a response containing a list of all PersonAssociated objects
 * @param {Request} req
 * @param {Response} res
 */
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

/**
 * Sends a response containing a single artefact, based on the artefact ID
 * provided on the request data
 * @param {Request} req
 * @param {Response} res
 */
const getArtefactDetails = async (req, res) => {
  Artefact_Local.findById(req.params.id)
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

/**
 * Registers a new artefact, based on the provided and filtered request data
 * @param {Request} req
 * @param {Response} res
 */
const registerArtefact = async (req, res) => {
  
  const dateNow = Date.now();
  const path = `/../storage/${dateNow}_${req.body.record.nameImg}`;
  const pathImg = `${URL}/getImage/${dateNow}_${req.body.record.nameImg}`;
  const pathFile = __dirname + path;

  // console.log(pathFile)
  fs.writeFile(
    pathFile,
    req.body.record.artefactImg.split(",")[1],
    { encoding: "base64" },
    function (err) {
      if (err) console.log(err);
      else {
      }
    }
  );

  const artefact = new Artefact_Local({
    artefactName: req.body.record.artefactName,
    description: req.body.record.description,
    memories: req.body.record.memories,
    associated: null,
    category: null,
    location: req.body.record.location,
    "artefactImg.imgURL": pathImg,
    "artefactImg.imgName": req.body.record.nameImg,
    "artefactImg.imgType": req.body.record.typeImg,
    "artefactImg.imgSize": req.body.record.sizeImg,
    "artefactImg.path": path,
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
            Artefact_Local.updateOne(
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
            // creates a new Category record
            const newCategory = new Category({
              category_name: req.body.record.category,
            });

            // updates category of artefact
            Artefact_Local.updateOne(
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
            Artefact_Local.updateOne(
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
            Artefact_Local.updateOne(
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

/**
 * Sends a response containing a single artefact, based on the artefact ID
 * provided on the request data. Used to provide the user with the feature to
 * edit a currently-existing artefact
 * @param {Request} req
 * @param {Response} res
 */
const editArtefact = (req, res) => {
  Artefact_Local.findByIdAndUpdate(
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
            Artefact_Local.updateOne(
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
            Artefact_Local.updateOne(
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
            error,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.record.associated })
        .then((result3) => {
          if (result3) {
            // stores the existing associated object in the artefact record
            Artefact_Local.updateOne(
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
            Artefact_Local.updateOne(
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

/**
 * Deletes a currently-existing artefact
 * @param {Request} req
 * @param {Response} res
 */
// delete artefact function for route: '/delete-artefact/:id'
const deleteArtefact = async (req, res) => {
  const artefact_id = req.params.id;
  const artefact_record = await Artefact_Local.findOne({ _id: artefact_id });

  // deletes artefact with the corresponding MongoDB record ID
  Artefact_Local.deleteOne({ _id: artefact_id })
    .then((artefact) => {
      const pathFile = __dirname + artefact_record.artefactImg.path;

      fs.unlink(pathFile, function (err) {
        if (err) console.log(err);
        else {
        }
      });

      res.status(200).send({
        message: "Delete artefact successfully",
        artefact,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error, on deleteArtefact()",
        artefact,
      });
    });
};

// get data based on page for route: '/data/:page'
// (NO AUTOMATIC TESTING YET)
const getPage = async (req, res) => {
  // current page
  const pageNum = req.params.page;

  // total count of all artefacts
  const totalArtefact = await Artefact_Local.countDocuments();

  let totalPages = Math.ceil(totalArtefact / LIMIT);

  let idx = (pageNum - 1) * LIMIT;

  await Artefact_Local.find()
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

// exports objects containing functions imported by router
module.exports = {
  allData,
  loginUser,
  getArtefactDetails,
  getCategories,
  getAssociated,
  registerArtefact,
  editArtefact,
  deleteArtefact,
  // no automatic testing yet
  getPage,

  // new search functions
  searchCategory,
  searchAssociated
};
