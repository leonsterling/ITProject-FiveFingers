const request = require("supertest");
const expect = require('chai').expect;
const dotenv = require('dotenv');
dotenv.config();

const app = require('../server')
const {User, Category, Associated, Artefact} = require('../models/user')

// existing valid user in database
const validUser = {
  username: "vincent",
  password: "kurniawan"
};

// dummy user non-existing in database
const invalidUser = {
  username: "kurniawan",
  password: "vincent"
}

const validQuery = "Postcard"
const invalidQuery = "Jakarta"

const validId = "6329b34997977604196719bd"
const invalidId = "0123456789"

// JWT token for authenticated routes
let tempToken;

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

/* login test */
describe("log-in functionality", () => {

  // valid user
  it("should accept correct credentials, and log-in successfully", (done) => {
    request(app)
      .post("/login")
      .send(validUser)
      .expect(200)
      .then((res) => {
        expect(res.body.message).to.be.eql("Login Successful");
        tempToken = `Bearer ${res.body.token}`;
        done();
      })
      .catch((err) => done(err));
  });

  // invalid username
  it("shouldn't accept non-exisiting username", (done) => {
    request(app)
      .post("/login")
      .send(invalidUser)
      .expect(500)
      .then((res) => {
        expect(res.body.message).to.be.eql("Login Unsuccessful");
        done();
      })
      .catch((err) => done(err));
  });

  // invalid password
  it("shouldn't accept invalid password", (done) => {
    request(app)
      .post("/login")
      .send(invalidUser)
      .expect(500)
      .then((res) => {
        expect(res.body.message).to.be.eql("Login Unsuccessful");
        done();
      })
      .catch((err) => done(err));
  });
})

/* search test */
describe("search functionality", () => {

  // valid search query 
  it("should retrieve artefacts that matches the query", (done) => {
    request(app)
      .get(`/search-artefacts/${validQuery}`)
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        const searched = res.body.artefactRecords
        expect(res.body.message).to.be.eql("Search query success with " + searched.length + " artefacts");
        done();
      })
      .catch((err) => done(err));
  });

  // invalid search query 
  it("should retrieve artefacts that doesn't match the query", (done) => {
    request(app)
      .get(`/search-artefacts/${invalidQuery}`)
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Search query success with 0 artefacts");
        done();
      })
      .catch((err) => done(err));
  });
})

/* retrieve all artefacts test */
describe("get artefacts functionality", () => {
  it("should retrieve all artefacts", (done) => {
    request(app)
      .get("/data")
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Successful in getting artefacts");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve all categories */
describe("get categories functionality", () => {
  it("should retrieve all categories", (done) => {
    request(app)
      .get("/get-categories")
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Categories recieved successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve all associataed */
describe("associated", () => {
  it("should retrieve all associated", (done) => {
    request(app)
      .get("/get-associated")
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Associated recieved successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve 1 artefact */
describe("associated", () => {
  it("should retrieve 1 artefact", (done) => {
    request(app)
      .get(`/get-artefact/${validId}`)
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact retrieved successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve a non-existing artefact */
describe("associated", () => {
  it("should not retrieve a non-existing artefact", (done) => {
    request(app)
      .get(`/get-artefact/${invalidId}`)
      .expect(500)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact retrieved unsuccessfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/*
// add an artefact
describe("associated", () => {
  it("should retrieve all associated", (done) => {
    request(app)
      .post("/add-artefact")
      .send(validUser)
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact registered successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

// edit an artefact
describe("associated", () => {
  it("should retrieve all associated", (done) => {
    request(app)
      .patch(`/edit-artefact/${validId}`)
      .expect(200)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Edit artefact successfully");
        done();
      })
      .catch((err) => done(err));
  });
});
*/