const express = require('express')
const passport = require('passport')
const User = require('../models/UserModel')
const Board = require('../models/BoardModel')
const Task = require('../models/TaskModel')

const { decode, sign, randomString } = require('./helpers')

const appUrl = process.env.APP_URL
const EXPIRATION = 1000 * 60 * 60 * 12
const router = express.Router()

router
  .get('/', passport.authenticate('bearer', { session: false }),
    (req, res) => {
      const userId = req.user.id
      User
        .findById(userId).populate('board')
        .then((user) => {
          const { board } = user
          const tasks = board.tasks
          User
            .find({
              tasks: { $in: tasks },
              _id: { $not: { $in: [...archived, ...otherUsers] } }
            }).select('-password -tasks -archived -other -email')
            .then((user) => {
              res.status(200).json({ tasks, user })
            })
        }).catch(err => res.status(500).json({ message: err.message }))
    })
  .post('/register', (req, res) => {
    const data = decode(req.body.token)
    data.forEach(field => {
      if (!field) {
        return res.status(300).json({ message: `${field} is required` })
      }
    })
    const user = new User(data)
    user
      .save()
      .then((profile) => {
        const payload = {
          exp: Date.now() + EXPIRATION,
          sub: user._id,
          type: user.type
        }
        const token = sign(payload)
        return res.status(200).json({ profile, token })
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .post('/login', (req, res) => {
    const { email, password } = decode(req.body.token)
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: 'User record not found.' })
        }
        user
          .validify(password)
          .then((passwordValid) => {
            if (!passwordValid) {
              return res.status(401).json({ message: 'Invalid credentials.' })
            }
            const payload = {
              exp: Date.now() + EXPIRATION,
              sub: user._id,
              type: user.type
            }
            const token = sign(payload)
            const profile = user
            return res.json({ profile, token })
          })
          .catch(err => res.status(500).json(err))
      })
      .catch(err => res.status(500).json(err))
  })
  .put('/task', passport.authenticate('bearer'), (req, res) => {
    const user = req.user
    const { type } = req.user
    const { userId } = req.params
    const { taskId, superLike, skip } = req.body
    User
      .findById(userId)
      .then((user) => {
        Task
          .findById(taskId)
          .then((task) => {
            const { board, tasks } = user
            const { id, title, description } = task
            task
              .save()
              .then(() => {
                user
                  .update({ board })
                  .then(() => {
                    user
                      .update({ tasks })
                      .then(() => {
                        res.status(200).json({ tasks })
                      }).catch(err => res.status(500).json({ at: 'User update', message: err.message }))
                  }).catch(err => res.status(500).json({ at: 'User update', message: err.message }))
              }).catch(err => res.status(500).json({ at: 'Task update', message: err.message }))
          }).catch(err => res.status(500).json({ at: 'Find task', message: err.message }))
      }).catch(err => res.status(500).json({ at: 'Find user', message: err.message }))
  })
  .get('/boards', passport.authenticate('bearer'), (req, res) => {
    const { type, boards } = req.user
    if (type !== 'user') {
      return res.status(400).json({ message: 'Must be logged in to view boards.' })
    }
    Board.find({ _id: ownedBoards, isActive: true })
      .select('titleAndSalary').populate('archivedUsers')
      .then((boards) => {
        res.status(200).json(boards)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .get('/profile', passport.authenticate('bearer', { session: false }),
    (req, res) => {
      res.status(200).json(req.user)
    })
  .put('/profile', passport.authenticate('bearer', { session: false }), (req, res) => {
    const oldUser = req.user
    const buffer = Object.keys(req.body)
    const restricted = ['type', 'tasks', 'password']
    const changes = {}
    buffer.forEach((key) => {
      if (!restricted.includes(key)) {
        if (req.body[key]) {
          changes[key] = req.body[key]
        }
      }
    })
    const updatedUser = Object.assign(oldUser, changes)
    updatedUser
      .validate()
      .then(() => {
        User.findOneAndUpdate({ email: oldUser.email }, changes).then(() => {
          res.status(200).json(changes)
        }).catch(err => res.status(500).json({ message: err.message }))
      }).catch(err => res.status(322).json({ message: err.message }))
  })


module.exports = router
