const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const user = await jwt.verify(token, "RANDOM-TOKEN");

    // verify user with token that was signed during authentication process
    req.user = user;
    next();
    
  } catch (error) {
    res.status(401).send({
      error: "You have not logged in!"
    });
  }
};
