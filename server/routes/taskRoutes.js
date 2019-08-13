const express = require('express')
const Task = require('./models/Task')
const router = express.Router()

router.route('/create').post((req, res) => {
  const task = new Task(req.body)
  task.save().then(task => {
    res.status(200).json({ 'message': 'Task successfully added ' })
  })
    .catch(err => {
      res.status(400).send('Error when saving to database:\n', err)
    })
})

router.route('/tasks').get((req, res) => {
  Task.find((err, tasks) => {
    if (err) {
      console.log(err)
    } else {
      res.json(tasks)
    }
  })
})

router.route('/tasks/:id').get((req, res) => {
  const id = req.params.id
  Task.findById(id, (err, task) => {
    res.json(task)
  })
})

router.route('/tasks/:id').put((req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (!task) { return next(new Error('Error getting the task!')) } else {
      task.name = req.body.name
      task.save().then(task => {
        res.json('Task updated successfully')
      })
        .catch(err => {
          res.status(400).send('Error when updating the task')
        })
    }
  })
})

router.route('/tasks/:id').get((req, res) => {
  Task.findByIdAndRemove({ _id: req.params.id }, (err, task) => {
    if (err) res.json(err)
    else res.json('Task successfully removed')
  })
})
