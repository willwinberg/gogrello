const passport = require('passport')
const jwt = require('jsonwebtoken')
const BearerStrategy = require('passport-http-bearer').Strategy
const secret = process.env.ACCESS_KEY
const User = require('./models/userModel')
// const Admin = require('./users/admin/adminModel')

function strategies () {
  // serialize/deserialize user
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => done(err, user))
  })

  // serialize/deserialize admin
  // passport.serializeUser((admin, done) => {
  //   done(null, admin._id)
  // })
  // passport.deserializeUser((adminId, done) => {
  //   Admin.findById(adminId, (err, user) => done(err, user))
  // })

  // strategy for handling requests for restricted endpoints
  // checks for JWT on Bearer token in Auth headers
  passport.use(new BearerStrategy((token, done) => {
    const { sub, userType, exp } = jwt.verify(token, secret)
    // check if expired
    if (exp <= Date.now()) {
      return done(null, false)
    }
    // check user type and search fo user in appropriate model
    if (userType === 'user') {
      User.findById(sub) // search users
        .select('-password -createdOn -__v')
        .then((user) => {
          if (!user) {
            return done(null, false)
          }
          return done(null, user)
        })
        .catch(() => done(null, false))
    } else if (userType === 'admin') {
      Admin.findById(sub) // search admins
        .select('-password -createdOn -__v')
        .then((admin) => {
          if (!admin) {
            return done(null, false)
          }
          return done(null, admin)
        })
        .catch(() => done(null, false))
    } else {
      return done(null, false) // we don't have any other types
    }
  }))
}

module.exports = strategies
