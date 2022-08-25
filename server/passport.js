// import User mongoose model
const {User} = require('./models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local')

// serialize user
passport.serializeUser((user, done) => {
    done(undefined, user._id)
})

// deserialize user
passport.deserializeUser((userId, done) => {
    User.findById(userId, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined)
    }
        return done(undefined, user)
    })
})

// Set up "local" strategy, an authentication based on username/password.
var strategy = new LocalStrategy( (username, password, cb) => {
    // first, check if there is a user in the db with this username
    User.findOne({username: username}, {}, {}, (err, user) => {
        if (err) { return cb(null, false, { message: 'Unknown error.' }) }
        if (!user) { return cb(null, false, { message: 'Incorrect username.' }) }
    // if there is a user with this username, check if the password matches
    user.verifyPassword(password, (err, valid) => {
      if (err) {  return cb(null, false, { message: 'Unknown error.' }) }
      if (!valid) { return cb(null, false, { message: 'Incorrect password.' }) }
      return cb(null, user)
    })
  })
})

// passport uses this local strategy
passport.use(strategy)

// export passport module
module.exports = passport