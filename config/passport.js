const passport = require("passport")
const passportLocal = require("passport-local")
const bcrypt = require("bcrypt")

const User = require("../models/User")

const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username })

  if (!user) {
    return done(null, false)
  }

  console.log('password clair', password)
  console.log('password encrypté', user.password)
  const passwordValid = await bcrypt.compare(password, user.password)
  console.log('passwordValid', passwordValid)

  if (!passwordValid) {
    return done(null, false)
  }

  return done(null, user)
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

module.exports = passport