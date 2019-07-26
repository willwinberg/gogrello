'use strict'

const express = require('express')

const app = express()

const mongoose = require('mongoose')

const cors = require('cors')

const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')

// models

const Task = require('./task');

// connect server to mongoDB

+mongoose.connect(

  'mongodb://localhost:27017/gogrello_test',

  { useNewUrlParser: true, useCreateIndex: true }

)

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// retrieves all the tasks

app.get('/api/task/list', (req, res) => {
  Task.find({}).sort({ updatedAt: 'descending' }).exec((err, tasks) => {
    if (err) return res.status(404).send('Error while getting tasks!')

    return res.send({ tasks })
  })
})

// create a new task

app.post('/api/task/create', (req, res) => {
  const task = new Task({ body: req.body.body, title: req.body.title })

  task.save((err) => {
    if (err) return res.status(404).send({ message: err.message })

    return res.send({ task })
  })
})

// update an existing task with the given object id

app.post('/api/task/update/:id', (req, res) => {
  let options = { new: true }

  Task.findByIdAndUpdate(req.params.id, req.body.data, options, (err, task) => {
    if (err) return res.status(404).send({ message: err.message })

    return res.send({ message: 'task updated!', task })
  })
})

// delete an existing task with the given object id

app.post('/api/task/delete/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(404).send({ message: err.message })

    return res.send({ message: 'task deleted!' })
  })
})

const PORT = 5000

app.listen(PORT)

console.log('api runnging on port ' + PORT + ': ')
