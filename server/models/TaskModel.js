const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const TaskSchema = mongoose.Schema({
  site: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  assignee: [{
    type: ObjectId,
    ref: 'User'
  }],
  reporter: [{
    type: ObjectId,
    ref: 'User'
  }],
  comment: {
    type: String,
    required: true
  },
  dateAdded: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  },
  dateComplete: { type: mongoose.Schema.Types.Date,
    default: null
  },
  user: [{ type: ObjectId, ref: 'User' }],
  board: [{ type: ObjectId, ref: 'Board' }],
  column: [{ type: ObjectId, ref: 'Column' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)
