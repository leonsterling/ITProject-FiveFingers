// import libraries
const request = require("supertest");
const expect = require("chai").expect;
const dotenv = require("dotenv");
const app = require("../server");
const fs = require('fs')
dotenv.config();

// HTTP status constants
const HTPP_SUCCESS = 200;
const HTTP_SERVER_ERROR = 500;

// JWT token for authenticated routes
let tempToken;

/* MOCK DATA */

// existing valid user in database
const validUser = {
  username: "test",
  password: "test",
  hashPassword: "$2a$10$gUZ8UgFgaA3JH11RV1l0IOOdVDby7mn2ovTW3fRQT57P7rbxg86ZG",
};

// dummy user non-existing in database
const invalidUsername = {
  username: "Postcard",
  password: "test",
};

// dummy user non-existing in database
const invalidPassword = {
  username: "test",
  password: "invalidTest",
};


// dummy category and associated existing in database
const validCategory = "Postcard"
const validAssociated = "Sterling"

// dummy invalid category and associated non-existing in database
const invalidCategory = "Non-existing-category";
const invalidAssociated = "Non-existing-associated";

// dummy invalid ID
const invalidId = "0123456789";

// variable for dummy artefact record
let dummyID;

// 
const pageNum = 1

// dummy image for dummy artefact

const imgName = "test_image.jpeg"
const imgSize = "207 kB"
const imgType = "image/jpeg"

let img = fs.readFileSync(`${__dirname}/test_image.jpeg`, 'base64');
img = "data:"+imgType+";base64," + img 

// dummy artefact with existing category and associated
const record = {
  record: {
    artefactName: "name",
    description: "description",
    memories: "memories",
    location: "location",
    associated: validAssociated,
    category: validCategory,
    nameImg: imgName,
    sizeImg: imgSize,
    typeImg: imgType,
    artefactImg: img
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
      .send(invalidUsername)
      .expect(HTTP_SERVER_ERROR)
      .then((res) => {
        expect(res.body.message).to.be.eql("Invalid Username");
        done();
      })
      .catch((err) => done(err));
  });

  // invalid password
  it("Shouldn't accept invalid password", (done) => {
    request(app)
      .post("/login")
      .send(invalidPassword)
      .expect(500)
      .then((res) => {
        expect(res.body.message).to.be.eql("Invalid Password");
        done();
      })
      .catch((err) => done(err));
  });
});

/* category search test */
describe("Category Search Integration Test", () => {
  // valid search query
  it("Should retrieve artefacts that matches the query", (done) => {
    request(app)
      .get(`/search-category/${validCategory}/${1}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        const searched = res.body.totalSearched;
        const query = res.body.query
        expect(res.body.message).to.be.eql(
          `${searched} artefacts matched the query: ${query}`
        );
        done();
      })
      .catch((err) => done(err));
  });

  // invalid search query
  it("Should retrieve no artefacts that matches an invalid query", (done) => {
    request(app)
      .get(`/search-category/${invalidCategory}/${1}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        const searched = res.body.totalSearched;
        const query = res.body.query
        expect(res.body.message).to.be.eql(
          
          `${searched} artefacts matched the query: ${query}`
        );
        done();
      })
      .catch((err) => done(err));
  });
});

/* Associated search  test */
describe("Associated Search Integration Test", () => {
  // valid search query
  it("Should retrieve artefacts that matches the query", (done) => {
    request(app)
      .get(`/search-associated/${validAssociated}/${1}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        const searched = res.body.totalSearched;
        const query = res.body.query
        expect(res.body.message).to.be.eql(
          `${searched} artefacts matched the query: ${query}`
        );
        done();
      })
      .catch((err) => done(err));
  });

  // invalid search query
  it("Should retrieve no artefacts that matches an invalid query", (done) => {
    request(app)
      .get(`/search-associated/${invalidAssociated}/${1}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        const searched = res.body.artefactRecords;
        const query = res.body.query
        expect(res.body.message).to.be.eql(
          
          `${searched.length} artefacts matched the query: ${query}`
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
      .get(`/data/${pageNum}`)
      .expect(HTPP_SUCCESS)
      .set({ Authorization: tempToken })
      .then((res) => {
        expect(res.body.message).to.be.eql(`Successfully retrieved page ${pageNum}`);
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

// Add an artefact
describe("Add Artefact Integration Test", () => {
  it("Should add an artefact", (done) => {
    request(app)
      .post(`/add-artefact`)
      .set({ Authorization: tempToken })
      .send(record)
      .expect(HTPP_SUCCESS)
      .then((res) => {
        dummyID = res.body.artefact._id;
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


/* retrieve 1 artefact */
describe("Get 1 Artefact Integration Test", () => {
  it("Should retrieve 1 artefact", (done) => {
    request(app)
      .get(`/get-artefact/${dummyID}`)
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
        expect(res.body.message).to.be.eql("Internal Server Error, on getArtefactDetails()");
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
      .set({ Authorization: tempToken })
      .expect(HTPP_SUCCESS)
      .then((res) => {
        expect(res.body.message).to.be.eql("Deleted artefact successfully");
        done();
      })
      .catch((err) => done(err));
  });
});
