const { Schema, model } = require("mongoose")

const SerieSchema = Schema(
  {
    name: String,
    episodes: [
      { type: Schema.Types.ObjectId, ref: 'Episode' }
    ]
  },
  {
    timestamps: true
  }
)

SerieSchema.post('findOneAndDelete', async serie => {
  await model('Episode').deleteMany(
    { serie: serie._id }
  )
})

const Serie = model('Serie', SerieSchema)

module.exports = Serie