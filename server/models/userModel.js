const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: String,
  description: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
