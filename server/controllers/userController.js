// libraries and mongoose models imported
const { User, Artefact, Category, Associated} = require("../models/user");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 10
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");

// search function
const searchBar = async (req,res) => {

  const query = req.params.query
  const exact =  "\""+query+"\""
  const text = "\"ssl certificate\""
  console.log(text)
  console.log(exact)
  Artefact.aggregate([
    {
      $search: {
        "index": "artefacts_search_index",
        "text": {
          "path": ["associated.person", "category.category_name"],
          "query": exact
        }
      }
    }, 
  ]).then((searched) => {
    
    if (searched.length == 0) {
      res.status(201).send({
        message: "Search query success with 0 results",
        searched,
      });
    }
    else {
      res.status(201).send({
        message: "Search query success with "+ searched.length +" result",
        searched,
      });
    }
  })
  .catch((error) => {
    res.status(500).send({
      message: "Error upon searching",
      error,
    });
  });
}

// Display All CRUD Data
const allData = (req, res) => {
  /*
  console.log("artefact data");
	Artefact.find(function (err, artefactRecords) {
		res.status(200).send(artefactRecords);
	});
  */
  Artefact.find()
    .then((artefactRecords) => {
      res.status(201).send({
        message: "Successful in getting artefacts",
        artefactRecords,
      });
    })
  .catch((error) => {
    res.status(500).send({
      message: "Error upon getting artefacts",
      error,
    });
  })

};


// gets users dashboard once successfully logged in
const getDashboard = async (req, res) => {
  res.status(200).send({
    message: "Login Successful, hello user!",
  });
};


// Get the particular Artefact detail
const artefact_details = async (req, res) => {
  console.log("artefact details");
  console.log("ID IS:"+ (JSON.stringify(req.url)));
  //console.log("ID IS:"+ JSON.stringify(req.parse,null,4));
  try{
    const record = await Artefact.findById(req.params.id)
    res.status(200).json(record);
  }catch (error){
    res.status(404).json({ message: error.message });
  }
};

// Update CRUD Detail by Id
const editArtefact = (req, res) => {
  console.log("IDFORCRUD")
  console.log(JSON.stringify(req.params.id));
  console.log("BODYFORCRUD")
  console.log(JSON.stringify(req.body['record']));
	Artefact.findByIdAndUpdate(req.params.id,req.body['record'])
		.then(function () {
      console.log("it worked")
			res.json("Artefact Edited");
		})
		.catch(function (err) {
			res.status(422).send("Artefact Failed to be edited.");
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

// Create new Artefact Record
const registerArtefact = async (req, res) => {
  const image_data = await cloudinary.uploader.upload(req.body.record.artefactImg, {
    upload_preset: "sterling_family_account",
  });
  
  const artefact = new Artefact({
    artefactName: req.body.record.artefactName,
    description: req.body.record.description,
    memories: req.body.record.memories,
    associated: null,
    category: null,
    location: req.body.record.location,
    // artefactDate: req.body.record.artefactDate,
    "artefactImg.imgURL": image_data.url,
    "artefactImg.publicID": image_data.public_id,
  });

  await artefact.save().then((result1) => {
    Category.findOne({category_name: req.body.record.category})
    .then((result2)=>{
      if (result2) {
          Artefact.updateOne({_id: result1._id}, {
            $set: {category: result2}
          }, function(err, doc) {
            if (err) {
              
            } else {
                
            }
        }
        )
      }
      else {
        const cat = new Category ({
          category_name: req.body.record.category
        })

        Artefact.updateOne({_id: result1._id}, {
          $set: {category: cat}
        },function(err, doc) {
          if (err) {
            
          } else {
              
          }
      })
        cat.save()
      }
    })
    .catch((error)=> {
      
    })

    Associated.findOne({person: req.body.record.associated})
    .then((result3)=>{
      if (result3) {
          Artefact.updateOne({_id: result1._id}, {
            $set: {associated: result3}
          }, function(err, doc) {
            if (err) {
              
            } else {
                
            }
        })
      }
      else {
        const ass = new Associated ({
          person: req.body.record.associated
        })

        Artefact.updateOne({_id: result1._id}, {
          $set: {associated: ass}
        }, function(err, doc) {
          if (err) {
            
          } else {
              
          }
      })
        ass.save()
      }
    })
    .catch((error)=> {
      
    })


    res.status(201).send({
      message: "Artefact registered successfully",
      result1,
    });
  }).catch((error) => {
    res.status(500).send({
      message: "Error upon registering artefact",
      error,
    });
  })
  

  /*
  User.updateOne(
    { _id: req.user.userId },
    { $push: { artefactList: artefact } },
    function (err, doc) {
      if (err) {
        res.status(500).send({
          message: "Error upon registering artefact",
          err,
        });
      } else {
        artefact.save().then((result) => {
          res.status(201).send({
            message: "Artefact registered successfully",
            result,
          });
        }).catch((error) => {
          res.status(500).send({
            message: "Error upon registering artefact",
            error,
          });
        });
      }
    }
  );
  */
};

const deleteArtefact = async(req, res) => {

  const artefact_id = req.params.id
  const artefact_record = await Artefact.findOne({_id: artefact_id})

  await Artefact.deleteOne({_id: artefact_id})
    .then( (result) => {
      console.log(result)
      console.log(artefact_record)
      cloudinary.uploader.destroy(artefact_record.artefactImg.publicID, function (error, result) {
        res.status(201).send({
          message: "Artefact deleted successfully",
          result,
          artefact_record
        });
      })
    })
    .catch( (error) => {
      console.log(error)
      res.status(500).send({
        message: "Error upon deleting artefact",
        result,
      });
    })
}


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

const changePassword = async (req,res) => {
  
      // hash the password using bcrypt before saving to mongodb
      const hashed_pass = await bcrypt.hash(req.body.password, SALT_FACTOR)
        User.findOneAndUpdate(
            {username: req.body.username},
            {password: hashed_pass},
            function(err, doc) {
                if (err) {
                  res.status(500).send({
                    message: "Error upon changing password",
                    err,
                  })
                } else {
                  res.status(201).send({
                    message: "Password changed successfully",
                    hashed_pass,
                  })    
                }
            }
        )
}

// Function to update patient's password
const updatePass = async (req,res) =>{

  try {
      
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
          const errorsFound = validationResult(req).array()
          req.flash('errors', errorsFound);
          return res.redirect('/patient/change-password')
      }

      // hash the password using bcrypt before saving to mongodb
      const hashed_pass = await bcrypt.hash(req.body.password, SALT_FACTOR)
      Patient.findOneAndUpdate(
          { _id: req.user._id},
          {password: hashed_pass},
          function(err, doc) {
              if (err) {
                  return res.redirect('/patient/404')
              } else {
                    
              }
          }
      )
  
      return res.redirect('/patient/dashboard')
      

  } catch(err) {
      // error detected, renders patient error page
      return res.redirect('/patient/404')
  }
}

// exports objects containing functions imported by router
module.exports = {
  allData,
  registerArtefact,
  registerUser,
  loginUser,
  getDashboard,
  editArtefact,
  deleteArtefact,
  artefact_details,
  searchBar,
  changePassword
};
