// import libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { cloudinary } = require("../utils/cloudinary");
const fs = require("fs");

// import mongoose models
const { User, Artefact, Category, Associated } = require("../models/user");

// constants
// const SALT_FACTOR = 10;
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

          if (!checkPass) {
            res.status(401).send({
              message: "Invalid Password",
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
          res.status(401).send({
            message: "Internal Server Error",
            isValid: false,
            error,
          });
        });
    })
    .catch((error) => {
      // wrong username
      res.status(401).send({
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
  categoryFunc(query)
    .then((artefactRecords) => {

      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matched the query
        res.status(401).send({
          message: "0 artefacts found with search query on category",
          totalSearched,
        });
      } else {
        
        categoryFunc(query)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            let totalPages = Math.ceil(totalSearched / LIMIT);
            res.status(200).send({
              message: `${totalSearched} artefacts found, current page: ${pageNum}`,
              totalPages,
              searched,
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

const searchAssociated = (req, res) => {
  const query = req.params.query;
  const pageNum = req.params.page;

  let idx = (pageNum - 1) * LIMIT;
  associatedFunc(query)
    .then((artefactRecords) => {
      
      const totalSearched = artefactRecords.length;
      if (totalSearched == 0) {
        // no artefact matched the query
        res.status(401).send({
          message: "0 artefacts found with search query on category",
          totalSearched,
        });
      } else {
        associatedFunc(query)
          .sort({ _id: -1 })
          .skip(idx)
          .limit(LIMIT)
          .then((searched) => {
            let totalPages = Math.ceil(totalSearched / LIMIT);
            res.status(200).send({
              message: `${totalSearched} artefacts found, current page: ${pageNum}`,
              totalPages,
              searched,
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
        message: "Internal Server Error, on getCategories()",
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
        message: "Internal Server Errorf, on getAssociated()",
        error,
      });
    });
};

// get a single artefact function for route: '/get-artefact/:id'
const getArtefact = async (req, res) => {
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
        message: "Internal Server Error, on getArtefact()",
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
    .then((artefact) => {
      // checks if category exists in database
      Category.findOne({ category_name: req.body.record.category })
        .then((category) => {
          if (category) {
            // stores the existing category object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { category: category },
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
            )
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
                  res.status(500).send({
                    message: "Error upon registering artefact",
                    err,
                  });
                } else {
                }
              }
            )
            // stores new category in database
            newCategory.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Internal Server Error, on editArtefact()",
            err,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.record.associated })
        .then((associated) => {
          if (associated) {
            // stores the existing associated object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { associated: associated },
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
          )
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
              }
              ,
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon edit artefact",
                    err,
                  });
                } else {
                }
              }
            )
            // stores new associated in database
            newAssociated.save();
          }
        })
        .catch((error) => {
          res.status(500).send({
            message: "Internal Server Error, on editArtefact()",
            err,
          });
        });

      res.status(200).send({
        message: "Edit artefact successfully",
        artefact,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Internal Server Error, on editArtefact()",
        err,
      });
    });
};

// delete artefact function for route: '/delete-artefact/:id'
const deleteArtefact = async (req, res) => {
  const artefact_id = req.params.id;
  const artefact_record = await Artefact.findOne({ _id: artefact_id });

  // deletes artefact with the corresponding MongoDB record ID
  Artefact.deleteOne({ _id: artefact_id })
    .then((artefact) => {
      const pathFile = __dirname + artefact_record.artefactImg.path;

      fs.unlink(pathFile, function (err) {
        if (err) console.log(err);
        else {
        }
      });

      res.status(200).send({
        message: "Delete artefact successfully",
        artefact
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error, on deleteArtefact()",
        artefact
      });
    });
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
        res.status(401).send({
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
        message: "Internal Server Error, on getPage()",
        error,
      });
    });
};

const addArtefact = (req, res) => {
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

  // console.log(req.body);
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
    .then((artefact) => {
      // checks if category exists in database
      Category.findOne({ category_name: req.body.category })
        .then((category) => {
          if (category) {
            // stores the existing category object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { category: category },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Internal Server Error, on addArtefact()",
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
              { _id: artefact._id },
              {
                $set: { category: newCategory },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Internal Server Error, on addArtefact()",
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
            message: "Internal Server Error, on addArtefact()",
            error,
          });
        });

      // checks if associated exists on database
      Associated.findOne({ person: req.body.associated })
        .then((associated) => {
          if (associated) {
            // stores the existing associated object in the artefact record
            Artefact.updateOne(
              { _id: artefact._id },
              {
                $set: { associated: associated },
              },
              function (err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Internal Server Error, on addArtefact()",
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
              { _id: artefact._id },
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
            message: "Internal Server Error, on addArtefact()",
            err,
          });
        });

      res.status(200).send({
        message: "Artefact registered successfully",
        artefact,
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
  loginUser,
  getPage,
  getArtefact,
  getCategories,
  getAssociated,
  addArtefact,
  editArtefact,
  deleteArtefact,
  searchCategory,
  searchAssociated,
};
