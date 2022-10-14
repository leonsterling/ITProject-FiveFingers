// import libraries
const request = require("supertest");
const expect = require("chai").expect;
const dotenv = require("dotenv");
const app = require("../server");
dotenv.config();

// constants
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

// dummy category and associated existing in database
const validCategory = "Postcard";
const validAssociated = "Vik";

// dummy invalid category and associated non-existing in database
const invalidCategory = "Non-existing-category";
const invalidAssociated = "Non-existing-associated";

// dummy query based on existing category and associated
const validQuery = validCategory;
const invalidQuery = invalidCategory;

// existing artefactID in database
const validId = "6330486ea4430795bb15ae0c";

// dummy invalid ID
const invalidId = "0123456789";

// variable for dummy artefact record
let dummyID;

// dummy image for dummy artefact
const img = `${__dirname}/test_image.jpeg`;

// dummy artefact with existing category and associated
const record = {
  record: {
    artefactName: "name",
    description: "description",
    memories: "memories",
    location: "location",
    associated: validAssociated,
    category: validCategory,
    artefactImg: img,
  },
};

// dummy artefact details for edit check with existing category and associated
const editRecord = {
  record: {
    artefactName: "nameEdit",
    description: "descriptionEdit",
    memories: "memoriesEdit",
    location: "locationEdit",
    associated: validAssociated,
    category: validCategory,
  },
};

/* MOCK DATA */

/* login test */
describe("Log In Integration Test", () => {
  // valid user
  it("Should accept correct credentials, and log-in successfully", (done) => {
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
  it("Shouldn't accept non-exisiting username", (done) => {
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
  it("Shouldn't accept invalid password", (done) => {
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
});

/* search test */
describe("Basic Search Integration Test", () => {
  // valid search query
  it("Should retrieve artefacts that matches the query", (done) => {
    request(app)
      .get(`/search-artefacts/${validQuery}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        const searched = res.body.artefactRecords;
        expect(res.body.message).to.be.eql(
          "Search query success with " + searched.length + " artefacts"
        );
        done();
      })
      .catch((err) => done(err));
  });

  // invalid search query
  it("Should retrieve no artefacts that matches an invalid query", (done) => {
    request(app)
      .get(`/search-artefacts/${invalidQuery}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        expect(res.body.message).to.be.eql(
          "Search query success with 0 artefacts"
        );
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve all artefacts test */
describe("Get All Artefacts Integration Test", () => {
  it("Should retrieve all artefacts", (done) => {
    request(app)
      .get("/data")
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        expect(res.body.message).to.be.eql("Successful in getting artefacts");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve all categories */
describe("Get All Categories Integration Test", () => {
  it("Should retrieve all categories", (done) => {
    request(app)
      .get("/get-categories")
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        expect(res.body.message).to.be.eql("Categories recieved successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve all associated */
describe("Get All Associated Integration Test", () => {
  it("Should retrieve all associated", (done) => {
    request(app)
      .get("/get-associated")
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        expect(res.body.message).to.be.eql("Associated recieved successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

/* retrieve 1 artefact */
describe("Get 1 Artefact Integration Test", () => {
  it("Should retrieve 1 artefact", (done) => {
    request(app)
      .get(`/get-artefact/${validId}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact retrieved successfully");
        done();
      })
      .catch((err) => done(err));
  });

  it("Should not retrieve a non-existing artefact", (done) => {
    request(app)
      .get(`/get-artefact/${invalidId}`)
      .expect(HTTP_SERVER_ERROR)
      .set({ Authorization: tempToken })
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact retrieved unsuccessfully");
        done();
      })
      .catch((err) => done(err));
  });
});

// Add an artefact
describe("Add Artefact Integration Test", () => {
  it("Should add an artefact", (done) => {
    request(app)
      .post(`/add-artefact`)
      .set({ Authorization: tempToken })
      .send(record)
      .expect(HTPP_SUCCESS)
      .then((res) => {
        dummyID = res.body.result1._id;
        expect(res.body.message).to.be.eql("Artefact registered successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

// Edit an artefact
describe("Edit Artefact Integration Test", () => {
  it("Should edit an artefact", (done) => {
    request(app)
      .patch(`/edit-artefact/${dummyID}`)
      .query({ id: validId })
      .set({ Authorization: tempToken })
      .send(editRecord)
      .expect(HTPP_SUCCESS)
      .then((res) => {
        expect(res.body.message).to.be.eql("Edit artefact successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

// Delete an artefact
describe("Delete Artefact Integration Test", () => {
  it("Should delete an artefact", (done) => {
    request(app)
      .delete(`/delete-artefact/${dummyID}`)
      .query({ id: validId })
      .set({ Authorization: tempToken })
      .expect(HTPP_SUCCESS)
      .then((res) => {
        expect(res.body.message).to.be.eql("Artefact deleted successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

// Change password
describe("Change Password Integration Test", () => {
  it("Should update the user's password", (done) => {
    request(app)
      .post(`/change-password`)
      .send(validUser)
      .expect(HTPP_SUCCESS)
      .then((res) => {
        expect(res.body.message).to.be.eql("Password changed successfully");
        done();
      })
      .catch((err) => done(err));
  });
});
