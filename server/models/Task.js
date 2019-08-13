const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  name: String,
  description: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)
