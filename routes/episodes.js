const express = require("express")
const app = express()

const Episode = require("../models/Episode")

app.post('/', async (req, res) => {
  const { name, duration, serie } = req.body
  
  const episode = await Episode.create({
    name,
    duration,
    serie
  })

  res.json(episode)
})

app.delete('/:_id', async (req, res) => {
  const { _id } = req.params

  await Episode.deleteOne({ _id })

  res.json({ success: "Episode deleted" })
})

module.exports = app