const { Schema, model } = require("mongoose")
const Serie = require("../models/Serie")

const EpisodeSchema = Schema(
  {
    name: String,
    duration: Number,
    serie: {
      type: Schema.Types.ObjectId, ref: 'Serie'
    }
  }, 
  {
    timestamps: true
  }
)

// middleware mongoose qui s'execute apres (post) l'evenement
// save (création en base de données)
// ce middleware va mettre a jour la série de l'épisode en 
// poussant dans son tableau d'épisode l'id de l'épisode qu'on
// vient de créer
EpisodeSchema.post('save', async episode => {
  await model('Serie').findOneAndUpdate(
    { _id: episode.serie },
    { $push: { episodes: episode._id } }
  )
})

// middleware mongoose qui s'execute avant (pre) l'evenement
// deleteOne d'un épisode
// EpisodeSchema.pre('deleteOne', async episode => {
//   console.log(episode)
// })

const Episode = model('Episode', EpisodeSchema)

module.exports = Episode
