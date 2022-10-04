const request = require("supertest");
const expect = require('chai').expect;
const dotenv = require('dotenv');
dotenv.config();

const app = require('../server')
const {User, Category, Associated, Artefact} = require('../models/user')

const HTPP_SUCCESS = 200
const HTTP_SERVER_ERROR = 500

// JWT token for authenticated routes
let tempToken;

/* MOCK DATA */

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

// dummy categories 
const validQuery = "Postcard"
const invalidQuery = "Jakarta"

// existing artefactID
const validId = "6329b34997977604196719bd"

// dummy invalid ID
const invalidId = "0123456789"

/*
// dummy artefact Data
const record = {
  artefactName: "dummyName",
  description: "dummyDescription",
  memories: "dummyMemories",
  associated: "Joseph Sterling",
  category: "Photo",
  location: "dummyLocation"
}
*/

/* MOCK DATA */

/* login test */
describe("log-in functionality", () => {

  // valid user
  it("should accept correct credentials, and log-in successfully", (done) => {
    request(app)
      .post("/login")
      .send(validUser)
      .expect(HTPP_SUCCESS)
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
      .expect(HTTP_SERVER_ERROR)
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
      .expect(HTPP_SUCCESS)
      .set({Authorization: tempToken})
      .then((res) => {
        const searched = res.body.artefactRecords
        expect(res.body.message).to.be.eql("Search query success with " + searched.length + " artefacts");
        done();
      })
      .catch((err) => done(err));
  });

  // invalid search query 
  it("should retrieve no artefacts that mathes an invalid query", (done) => {
    request(app)
      .get(`/search-artefacts/${invalidQuery}`)
      .expect(HTPP_SUCCESS)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Search query success with 0 artefacts");
        done();
      })
      .catch((err) => done(err));
  });
})

/* retrieve all artefacts test */
describe("get all artefacts functionality", () => {
  it("should retrieve all artefacts", (done) => {
    request(app)
      .get("/data")
      .expect(HTPP_SUCCESS)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Successful in getting artefacts");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve all categories */
describe("get all categories functionality", () => {
  it("should retrieve all categories", (done) => {
    request(app)
      .get("/get-categories")
      .expect(HTPP_SUCCESS)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Categories recieved successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve all associated */
describe("get all associated functionality", () => {
  it("should retrieve all associated", (done) => {
    request(app)
      .get("/get-associated")
      .expect(HTPP_SUCCESS)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Associated recieved successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve 1 artefact */
describe("get 1 particular artefact funtionality", () => {
  it("should retrieve 1 artefact", (done) => {
    request(app)
      .get(`/get-artefact/${validId}`)
      .expect(HTPP_SUCCESS)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact retrieved successfully");
        done();
      })
      .catch((err) => done(err));
  });

  it("should not retrieve a non-existing artefact", (done) => {
    request(app)
      .get(`/get-artefact/${invalidId}`)
      .expect(HTTP_SERVER_ERROR)
      .set({Authorization: tempToken})
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact retrieved unsuccessfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/*
// edit an artefact
describe("edit an artefact functionality", () => {
  it("should edit an artefact", (done) => {
    request(app)
      .patch(`/edit-artefact/${validId}`)
      .set({Authorization: tempToken})
      .send(record)
      .expect(HTPP_SUCCESS)
      .then((res) => {
        expect(res.body.message).to.be.eql("Edit artefact successfully");
        done();
      })
      .catch((err) => done(err));
  });
});
*/