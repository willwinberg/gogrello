
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const BoardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: [{
    type: ObjectId,
    ref: 'User'
  }],
  tasks: [{
    type: ObjectId,
    ref: 'Task'
  }],
  columns: {
    type: Array,
    required: true
  },
  // column: [{ type: ObjectId, ref: 'Column' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Board', BoardSchema)
