const express = require("express")
const app = express()

const Serie = require("../models/Serie")

app.post('/', async (req, res) => {
  const { name } = req.body
  
  const serie = await Serie.create({
    name
  })

  res.json(serie)
})

app.get('/:_id', async (req, res) => {
  const { _id } = req.params

  const serie = await Serie.findById(_id)
    .populate('episodes')

  res.json(serie)
})

app.delete('/:_id', async (req, res) => {
  const { _id } = req.params

  await Serie.findOneAndDelete({ _id })

  res.json({ success: "Serie deleted" })
})

module.exports = app