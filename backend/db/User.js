const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        require: true,
        unique: true,
      },
      email: {
        type: String,
        require: true,
        unique: true,
      },
      country: {
        type: String,
        require: true,
      },
      img: {
        type: String,
      },
      city: {
        type: String,
        require: true,
      },
      phone: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
        unique: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )

module.exports = mongoose.model("User", UserSchema)

