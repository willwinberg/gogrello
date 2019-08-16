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
            .findOne({
              topSkills: { $in: topSkills },
              _id: { $not: { $in: [...skippedUsers, ...likedUsers] } }
            }).select('-password -likedJobs -matchedJobs -skippedJobs -email')
            .then((seeker) => {
              res.status(200).json({ job, seeker })
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

module.exports = router
