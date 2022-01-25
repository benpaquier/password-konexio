// import de dotenv
// Le fichier .env correspond a nos variables d'environnement
// notre environemment pour le moment c'est local

// quand on pousse sur heroku, il faut les redéfinir

// on pousse jamais le .env
// package dotenv
require("dotenv").config()

const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const port = process.env.PORT

const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")
const seriesRoutes = require("./routes/series")
const episodesRoutes = require("./routes/episodes")

const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL)
const db = mongoose.connection

db.on('error', (err) => console.log(err))
db.once('open', () => console.log("connected to db"))

app.use(morgan('tiny'))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/series', seriesRoutes)
app.use('/episodes', episodesRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})