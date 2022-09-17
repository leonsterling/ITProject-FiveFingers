const request = require("supertest");
const expect = require('chai').expect;

const dotenv = require('dotenv');
dotenv.config();
const app = require('../server.js')

const tempUser = {
  username: process.env.USER_TEST,
  password: process.env.USER_TEST_PASSWORD,
};

let tempToken;

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

describe("login users", () => {
  it("should accept correct credentials", (done) => {
    request(app)
      .post("/login")
      .send(tempUser)
      .expect(200)
      .then((res) => {
        expect(res.body.message).to.be.eql("Login Successful");
        tempToken = `Bearer ${res.body.token}`;
        done();
      })
      .catch((err) => done(err));
  });

  it("shouldn't accept invalid password", (done) => {
    tempUser.password = process.env.USER_TEST_PASSWORD + "asdf";
    request(app)
      .post("/login")
      .send(tempUser)
      .expect(400)
      .then((res) => {
        expect(res.body.message).to.be.eql("Error in loggin in");
        done();
      })
      .catch((err) => done(err));
  });

  it("shouldn't accept non-exisiting username", (done) => {
    tempUser.username = process.env.USER_TEST + "asdf";
    request(app)
      .post("/login")
      .send(tempUser)
      .expect(404)
      .then((res) => {
        expect(res.body.message).to.be.eql("User doesn't exist");
        done();
      })
      .catch((err) => done(err));
  });
  /*
  it("should log out users with valid token", (done) => {
    request(app)
      .delete("/logout")
      .set({
        Authorization: tempToken,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).to.be.eql("Logout successful");
        done();
      })
      .catch((err) => done(err));
  });
  */
});

describe("dashboard", () => {
  it("should retrieve artefacts", (done) => {
    request(app)
      .get("/data")
      .expect(201)
      .set({
        Authorization: tempToken,
      })
      .then((res) => {
        expect(res.body.message).to.be.eql("Successful in getting artefacts");
        done();
      })
      .catch((err) => done(err));
  });
});