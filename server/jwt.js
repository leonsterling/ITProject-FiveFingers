const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const user = await jwt.verify(token, "RANDOM-TOKEN");

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();
    
  } catch (error) {
    res.status(401).send({
      error: "You have not logged in!"
    });
  }
};
