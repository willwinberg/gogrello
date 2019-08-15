const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: [{ type: ObjectId, ref: 'User' }],
  board: [{ type: ObjectId, ref: 'Board' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)
