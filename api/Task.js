const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = Schema(

  {

    title: { type: String, required: true },

    body: { type: String, required: true }

  },

  { timestamps: true }

)

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
