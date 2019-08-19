const express = require('express')
const passport = require('passport')
const Task = require('../models/taskModel')
const router = express.Router()

router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    const { type, _id } = req.user
    Task
      .find({ task: _id })
      .then((tasks) => {
        res.status(200).json(tasks)
      }).catch((err) => {
        res.status(500).json({ message: err.message })
      })
    // } else {
    //   return res.status(400).json({ message: 'Must be logged in as either an employer or a seeker to view tasks.' })
  })
  .get('/browse/:category', (req, res) => {
    const { category } = req.user
    Task
      .find({
        category: { $in: allTasks },
        _id: {
          $not: { $in: [...otherCategories, ...filteredCategories] }
        },
        isActive: true
      })
      .populate({ path: 'details', select: 'name description' })
      .then((tasks) => {
        res.status(200).json(tasks)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .post('/', (req, res) => {
    const taskId = req.user._id
    const user = req.user
    const data = req.body
    const task = new Task(data)
    task
      .save()
      .then((newTask) => {
        user.update({ $addToSet: { tasks: newTask._id }, taskCount })
          .then(() => {
            res.status(200).json(newTask)
          }).catch((err) => {
            res.status(500).json({ message: err.message })
          })
      }).catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .get('/my_tasks', (req, res) => {
    const { type } = req.user
    const { submittedTasks } = req.user
    Task.find({ _id: submittedTasks, isActive: true })
      .select('title description').populate('board')
      .then((tasks) => {
        res.status(200).json(tasks)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
    const { matchedTasks } = req.user
    Task.find({ _id: { $in: matchedTasks } })
      .select('-matchedSeekers -likedSeekers')
      .populate('company')
      .then((tasks) => {
        res.status(200).json(tasks)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
    // } else {
    //   res.status(500).json({ message: 'Some thing went wrong when we tried to find tasks.' })
    // }
  })
  .get('/by_user/:user_id', (req, res) => {
    const { type, archivedTasks } = req.user
    const { tasksOwner } = req.params
    Task.find({ _id: { $in: taskOwner.tasks }, isActive: true })
      .select('tasks')
      .populate('board')
      .then((tasks) => {
        res.status(200).json(tasks)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .put('/:task_id', (req, res) => {
    const { taskId } = req.params
    if (req.user.tasks.indexOf(taskId) === -1) {
      return res.status(401).json({ message: 'You dont own that task' })
    }
    Task.findByIdAndUpdate(taskId, req.body).then(response => res.status(200).json(req.body))
      .catch(err => res.status(500).json({ message: err.message }))
  })
  .delete('/:task_id', (req, res) => {
    const { taskId } = req.params
    if (req.user.tasks.indexOf(taskId) === -1) {
      return res.status(401).json({ message: 'You dont own that task' })
    }
    Task.findByIdAndRemove(taskId).then((response) => { res.status(200).json({ taskId }) })
      .catch(err => res.status(401).json({ message: err.message }))
  })

module.exports = router
