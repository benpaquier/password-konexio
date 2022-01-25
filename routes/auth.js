const express = require("express")
const app = express()
const passport = require("../config/passport")
const bcrypt = require("bcrypt")

const User = require("../models/User")

app.post('/login', passport.authenticate("local"), async (req, res) => {
  console.log(req.user)
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  // il faut qu'on encrypte notre mot de passe
  // avant de le stocker en base de données
  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    password: hash
  })

  res.json(user)
})

module.exports = app