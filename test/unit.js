// import libraries
const assert = require("chai").assert;
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

// import mongoose models 
const { User, Category, Associated, Artefact} = require("../models/user");

/* MOCK DATA */

// existing user in database
const validUser = {
  username: "test",
  password: "test",
  hashPassword: "$2a$10$92nS84GC86VA1Meh6fz8jO52fnthcer.f1QUDrwzt7K0gE0vQimOO",
};

// dummy user non-existing in database
const invalidUser = {
  username: "invalidTest",
  password: "invalidTest",
};

// existing category and associated in database
const validCategory = "Postcard";
const validAssociated = "Sterling";

// dummy category and associated non-existing in database
const invalidCategory = "Non-existing-category";
const invalidAssociated = "Non-existing-associated";

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
  it("Should retrieve an existing account that matches the password", (done) => {
    User.findOne({ username: validUser.username })
      .then((user) => {
        if (user) {
          assert.isNotNull(user);
          bcrypt
            .compare(validUser.password, validUser.hashPassword)
            .then((pass) => {
              assert.isTrue(pass);
              done();
            });
        }
      })
      .catch((err) => done(err));
  });

  // generate jwt
  it("Should generate a JWT token if username and password matches to an existing account", (done) => {
    User.findOne({ username: validUser.username })
      .then((user) => {
        if (user) {
          assert.isNotNull(user);
          bcrypt
            .compare(validUser.password, validUser.hashPassword)
            .then((pass) => {
              if (pass) {
                assert.isTrue(pass);
                const token = jwt.sign(
                  { userId: user._id, username: user.username },
                  "RANDOM-TOKEN",
                  { expiresIn: "24h" }
                );
                assert.isNotNull(token);
                done();
              }
            });
        }
      })
      .catch((err) => done(err));
  });

  // invalid username
  it("Should not retrieve a non-existing user if username doesn't match", (done) => {
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
describe("Basic Search Unit Tests", () => {
  // matching search query from <category> field
  it("Should retrieve an artefact with matching <category> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "category_index",
          phrase: {
            path: ["category.category_name"],
            query: validCategory,
          },
        },
      },
    ])
      .then((artefactRecords) => {
        assert.isNotNull(artefactRecords);
        done();
      })
      .catch((err) => done(err));
  });

  // matching search query from <associated> field
  it("Should retrieve an artefact with matching <associated> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "associated_index",
          phrase: {
            path: ["associated.person"],
            query: validAssociated,
          },
        },
      },
    ])
      .then((artefactRecords) => {
        assert.isNotNull(artefactRecords);
        done();
      })
      .catch((err) => done(err));
  });

  // // non-matching search query from <associated> field
  it("Should not retrieve any artefact with non-matching <category> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "category_index",
          phrase: {
            path: ["category.category_name"],
            query: " ",
          },
        },
      },
    ])
      .then((artefactRecords) => {
        assert.isEmpty(artefactRecords);
        done();
      })
      .catch((err) => done(err));
  });

  // // non-matching search query from <associated> field
  it("Should not retrieve any artefact with non-matching <associated> query", (done) => {
    Artefact.aggregate([
      {
        $search: {
          index: "associated_index",
          phrase: {
            path: ["associated.person"],
            query: " ",
          },
        },
      },
    ])
      .then((artefactRecords) => {
        assert.isEmpty(artefactRecords);
        done();
      })
      .catch((err) => done(err));
  });
});

/* Add Category/Associated Unit Test */
describe("Add Category/Associated Unit Tests", () => {
  // new Category
  it("Should add a new category if it doesn't exist before", (done) => {
    Category.findOne({ category_name: invalidCategory })
      .then((category) => {
        assert.isNull(category);
        done();
      })
      .catch((err) => done(err));
  });

  // existing category
  it("Should not duplicate an existing category", (done) => {
    Category.findOne({ category_name: validCategory })
      .then((category) => {
        assert.isNotNull(category);
        done();
      })
      .catch((err) => done(err));
  });

  // new associated
  it("Should add a new associated if it doesn't exist before", (done) => {
    Associated.findOne({ person: invalidAssociated })
      .then((associated) => {
        assert.isNull(associated);
        done();
      })
      .catch((err) => done(err));
  });

  // existing associated
  it("Should not duplicate an existing associated", (done) => {
    Associated.findOne({ person: validAssociated })
      .then((associated) => {
        assert.isNotNull(associated);
        done();
      })
      .catch((err) => done(err));
  });
});