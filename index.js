// import de dotenv
require("dotenv").config()

const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const port = process.env.PORT

const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")

const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL)
const db = mongoose.connection

db.on('error', (err) => console.log(err))
db.once('open', () => console.log("connected to db"))

app.use(morgan('tiny'))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})