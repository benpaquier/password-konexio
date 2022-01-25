const { Schema, model } = require("mongoose")

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true
  }
)



const User = model('User', UserSchema)

module.exports = User