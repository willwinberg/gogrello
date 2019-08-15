const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  board: [{ type: ObjectId, ref: 'Board' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
