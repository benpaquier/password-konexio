const express = require("express")
const app = express()

const User = require("../models/User")

app.get('/', async (req, res) => {
  const users = await User.find({})
    .select('username id createdAt')

  res.json(users)
})

module.exports = app