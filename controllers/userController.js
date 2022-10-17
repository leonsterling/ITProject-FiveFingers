/**
 * @fileoverview Uses the parsed request, transforms it into logic based on the
 *               provided request (and any additional required data) and sends
 *               an appropriate response, based on what the client requested
 * Dependencies
 * - BCrypt to implement encrypted security
 * - JSON Web Token to send URL-safe claims between the server and client-side
 *   code
 * - FS to handle local upload of images into a local folder
 */

/* Imports of packages */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

/* Imports of mongoose models */
const {
  User,
  Artefact,
  Category,
  Associated
} = require("../models/user");

/* Main implementation */

// page limit constant
const LIMIT = 16;

// const HOST = "http://localhost";
// const PORT = 5100;
// const URL = `${HOST}:${PORT}`;

const URL = `http://157.245.156.125`;


/**
 * MongoDB aggregate pipeline for the search index: "associated_index"
 * @param {Query} query
 */
const associatedIndex = (query) =>
  Artefact.aggregate([
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

/**
 * MongoDB aggregate pipeline for the search index: "category_index"
 * @param {Query} query
 */
const categoryIndex = (query) =>
  Artefact.aggregate([
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

/**
 * Sends a JWT token upon a user login session. Successfully logs a
 * user in only if both the user's username and password are valid.
 * @param {Request} req
 * @param {Response} res
 */
const loginUser = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, checkPass) => {
        if (err) {
          return res.status(500).send({
            message: "Internal Server Error, on loginUser()",
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
        } else {
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
      });
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

/**
 * Sends all artefacts recorded that matches the search query 
 * based on the the category field
 * @param {Request} req
 * @param {Response} res
 */
const searchCategory = (req, res) => {
  const query = req.params.query;
  const pageNum = req.params.page;

  let idx = (pageNum - 1) * LIMIT;
  categoryIndex(query)
    .then((artefactRecords) => {
      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matched the query
        res.status(200).send({
          message: `${totalSearched} artefacts matched the query: ${query}`,
          artefactRecords,
          totalSearched,
          query
        });
      } else {
        categoryIndex(query)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            const totalPages = Math.ceil(totalSearched / LIMIT);
            res.status(200).send({
              message: `${totalSearched} artefacts matched the query: ${query}`,
              totalPages,
              totalSearched,
              searched,
              query
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Internal Server Error, on searchCategory()",
              error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Internal Server Error, on searchCategory()",
        error,
      });
    });
};

/**
 * Sends all artefacts recorded that matches the search query 
 * based on the the associated field
 * @param {Request} req
 * @param {Response} res
 */
const searchAssociated = (req, res) => {
  const query = req.params.query;
  const pageNum = req.params.page;

  let idx = (pageNum - 1) * LIMIT;
  associatedIndex(query)
    .then((artefactRecords) => {
      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matchd the query
        res.status(200).send({
          message: `${totalSearched} artefacts matched the query: ${query}`,
          artefactRecords,
          totalSearched,
          query
        });
      } else {
        associatedIndex(query, idx)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            const totalPages = Math.ceil(totalSearched / LIMIT);

            res.status(200).send({
              message:`${totalSearched} artefacts matched the query: ${query}`,
              totalPages,
              searched,
              totalSearched,
              query
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Internal Server Error, on searchAssociated()",
              error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Internal Server Error, on searchAssociated()",
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
        message: "Internal Server Error, on getCategories()",
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
        message: "Internal Server Error, on getCategories()",
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
  Artefact.findById(req.params.id)
    .then((result) => {
      res.status(200).send({
        message: "Artefact retrieved successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Internal Server Error, on getArtefactDetails()",
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

  fs.writeFile(
    pathFile,
    req.body.record.artefactImg.split(",")[1],
    { encoding: "base64" },
    function (err) {
      if (err) {
        return res.status(500).send({
          message: "Internal Server Error, on registerArtefact()",
          err,
        });
      }
      
      else {
      }
    }
  );
  
  const artefact = new Artefact({
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
    .then((artefact) => {
      // checks if category exists in database
      Category.findOne({ category_name: req.body.record.category })
        .then((categoryObject) => {
          if (categoryObject) {
            // stores the existing category object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { category: categoryObject },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on registerArtefact()",
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
              { _id: artefact._id },
              {
                $set: { category: newCategory },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on registerArtefact()",
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
          return res.status(500).send({
            message: "Internal Server Error, on registerArtefact()",
            error,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.record.associated })
        .then((associatedObject) => {
          if (associatedObject) {
            // stores the existing associated object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { associated: associatedObject },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on registerArtefact()",
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
              { _id: artefact._id },
              {
                $set: { associated: newAssociated },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on registerArtefact()",
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
          return res.status(500).send({
            message: "Internal Server Error, on registerArtefact()",
            error,
          });
        });

      return res.status(200).send({
        message: "Artefact registered successfully",
        artefact,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error, on registerArtefact()",
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
  Artefact.findByIdAndUpdate(
    { _id: req.params.id },
    {
      artefactName: req.body.record.artefactName,
      description: req.body.record.description,
      memories: req.body.record.memories,
      location: req.body.record.location,
    }
  )
    .then((artefact) => {
      // checks if category exists in database
      Category.findOne({ category_name: req.body.record.category })
        .then((categoryObject) => {
          if (categoryObject) {
            // stores the existing category object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { category: categoryObject },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on editArtefact()",
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
              { _id: artefact._id },
              {
                $set: { category: newCategory },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on editArtefact()",
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
          return res.status(500).send({
            message: "Internal Server Error, on editArtefact()",
            error,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.record.associated })
        .then((associatedObject) => {
          if (associatedObject) {
            // stores the existing associated object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { associated: associatedObject },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on editArtefact()",
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
              { _id: artefact._id },
              {
                $set: { associated: newAssociated },
              },
              function (err, doc) {
                if (err) {
                  return res.status(500).send({
                    message: "Internal Server Error, on editArtefact()",
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
          return res.status(500).send({
            message: "Internal Server Error, on editArtefact()",
            error,
          });
        });

      return res.status(200).send({
        message: "Edit artefact successfully",
        artefact,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error, on editArtefact()",
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
  const artefact_record = await Artefact.findOne({ _id: artefact_id });

  Artefact.deleteOne({ _id: artefact_id })
    .then((artefact) => {
      const pathFile = __dirname + artefact_record.artefactImg.path;

      fs.unlink(pathFile, function (err) {
        if (err) {
        return res.status(500).send({
          message: "Internal Server Error, on deleteArtefact()",
          err
        }) 
      }
        else {
        }
      });

      return res.status(200).send({
        message: "Deleted artefact successfully",
        artefact,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Internal Server Error, on deleteArtefact()",
        error
      });
    });
};


/**
 * Sends all artefacts in the database to be rendered on the dashboard.
 * Artefacts are sent based on the page at which it is placed in
 * @param {Request} req
 * @param {Response} res
 */
const getPage = async (req, res) => {
 
  const pageNum = req.params.page;

  const totalArtefact = await Artefact.countDocuments();

  const totalPages = Math.ceil(totalArtefact / LIMIT);

  const idx = (pageNum - 1) * LIMIT;

  await Artefact.find()
    .sort({ _id: -1 })
    .skip(idx)
    .limit(LIMIT)
    .then((dataInPage) => {
      const dataPerPage = dataInPage.length;

      if (dataPerPage > 0) {
        return res.status(200).send({
          message: `Successfully retrieved page ${pageNum}`,
          dataPerPage,
          dataInPage,
          totalPages,
          totalArtefact,
        });
      } else {
        return res.status(200).send({
          message: "Invalid Page Number",
          dataPerPage,
          dataInPage,
          totalPages,
          totalArtefact,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Internal Server Error, on getPage()",
        error,
      });
    });
};

// exports objects containing functions imported by router
module.exports = {
  loginUser,
  getArtefactDetails,
  getCategories,
  getAssociated,
  registerArtefact,
  editArtefact,
  deleteArtefact,
  getPage,
  searchCategory,
  searchAssociated,
};
