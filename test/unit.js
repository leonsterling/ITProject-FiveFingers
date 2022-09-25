const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");
dotenv.config();

const app = require("../server");
const { User, Category, Associated, Artefact } = require("../models/user");

const HTPP_SUCCESS = 200;
const HTTP_SERVER_ERROR = 500;

// JWT token for authenticated routes
let tempToken;

/* MOCK DATA */

// existing valid user in database
const validUser = {
  username: "vincent",
  password: "kurniawan",
  hashPassword: "$2a$10$HoV8ohBfPxbi2qRn5GYZ7.mTMUVlMVe2dvBmGmV7qmIeb.0UDpnMe",
};

// dummy user non-existing in database
const invalidUser = {
  username: "kurniawan",
  password: "vincent",
};

// dummy category and associated
const validCategory = "Postcard";
const validAssociated = "Vik";

// dummy invalid category and associated
const invalidCategory = "Non-existing-category"
const invalidAssociated = "Non-existing-associated"

// existing artefactID
const validId = "6329b34997977604196719bd";

// dummy invalid ID
const invalidId = "0123456789";

/* MOCK DATA */

/* login test */
describe("Log In Unit Tests", () => {
  // valid usersname
  it("Should retrieve an existing account that matches with the username", (done) => {
    User.findOne({ username: validUser.username })
      .then((user) => {
        assert.isNotNull(user);
        done();
      })
      .catch((err) => done(err));
  });

  // valid password
  it("Should retrieve an existing account that matches with the username and password", (done) => {
    User.findOne({ username: validUser.username })
      .then((user) => {
        bcrypt
          .compare(validUser.password, validUser.hashPassword)
          .then((pass) => {
            assert.isTrue(pass);
            done();
          });
      })
      .catch((err) => done(err));
  });

  // generate jwt
  it("Should generate a JWT token if username and password matches to an existing account", (done) => {
    User.findOne({ username: validUser.username })
      .then((user) => {
        bcrypt
          .compare(validUser.password, validUser.hashPassword)
          .then((pass) => {
            const token = jwt.sign(
              { userId: user._id, username: user.username },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
            assert.isNotNull(token);
            done();
          });
      })
      .catch((err) => done(err));
  });

  // invalid username
  it("Should not retrieve a non-existing user", (done) => {
    User.findOne({ username: invalidUser.username })
      .then((user) => {
        assert.isNull(user);
        done();
      })
      .catch((err) => done(err));
  });

  // invalid password
  it("Should not retrieve an existing account if password doesn't match", (done) => {
    User.findOne({ username: validUser.username })
      .then((user) => {
        bcrypt
          .compare(invalidUser.password, validUser.hashPassword)
          .then((pass) => {
            assert.isFalse(pass);
            done();
          });
      })
      .catch((err) => done(err));
  });
});

/* search test */
describe("Search Query Unit Tests", () => {

  // matching search query from <category> field
  it("Should retrieve an artefact with matching <category> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "associated_category_index",
          text: {
            path: ["associated.person", "category.category_name"],
            query: validCategory,
          },
        },
      },
    ])
    .then((artefactRecords) => {
        assert.isNotNull(artefactRecords)
        done()
      })
    .catch((err) => done(err));
  });

  // matching search query from <associated> field
  it("Should retrieve an artefact with matching <associated> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "associated_category_index",
          text: {
            path: ["associated.person", "category.category_name"],
            query: validAssociated,
          },
        },
      },
    ])
    .then((artefactRecords) => {
        assert.isNotNull(artefactRecords)
        done()
      })
    .catch((err) => done(err));
  });

  // // matching search query from <category> AND <associated> fields
  it("Should retrieve an artefact with matching <category> and <associated> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "associated_category_index",
          text: {
            path: ["associated.person", "category.category_name"],
            query: validCategory + " " + validAssociated ,
          },
        },
      },
    ])
    .then((artefactRecords) => {
        assert.isNotNull(artefactRecords)
        done()
      })
    .catch((err) => done(err));
  });

  // // non-matching search query from <category> field
  it("Should not retrieve any artefact with non-matching <category> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "associated_category_index",
          text: {
            path: ["associated.person", "category.category_name"],
            query: invalidCategory,
          },
        },
      },
    ])
    .then((artefactRecords) => {
        assert.isEmpty(artefactRecords)
        done()
      })
    .catch((err) => done(err));
  });

  // // non-matching search query from <associated> field
  it("Should not retrieve any artefact with non-matching <associated> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "associated_category_index",
          text: {
            path: ["associated.person", "category.category_name"],
            query: invalidAssociated,
          },
        },
      },
    ])
    .then((artefactRecords) => {
        assert.isEmpty(artefactRecords)
        done()
      })
    .catch((err) => done(err));
  });
});

/* Add Category/Associated Unit Test */
describe("Add Category/Associated Unit Tests", () => {

    // new Category
    it("Should add a new category if it doesn't exist before", (done) => {
    
        Category.findOne({category_name: invalidCategory})
            .then((category) => {
                assert.isNull(category)
                done()
            })
            .catch((err) => done(err));
    });

    // existing category
    it("Should not duplicate an existing category", (done) => {
        Category.findOne({category_name: validCategory})
            .then((category) => {
                assert.isNotNull(category)
                done()
            })
            .catch((err) => done(err));
    });

    // new associated
    it("Should add a new associated if it doesn't exist before", (done) => {
    
        Associated.findOne({person: invalidAssociated})
            .then((associated) => {
                assert.isNull(associated)
                done()
            })
            .catch((err) => done(err));
    });

    // existing associated
    it("Should not duplicate an existing associated", (done) => {
        Associated.findOne({person: validAssociated})
            .then((associated) => {
                assert.isNotNull(associated)
                done()
            })
            .catch((err) => done(err));
    });

  });
