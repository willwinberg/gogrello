const express = require('express')
const passport = require('passport');
const User = require('../models/UserModel')
const Board = require('../models/BoardModel')
const Task = require('../models/TaskModel')

const { decode, sign, randomString } = require('./helpers')

const appUrl = process.env.APP_URL
const EXPIRATION = 1000 * 60 * 60 * 12 // hours in milliseconds
const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    User.find()
      .populate('board')
      .populate('type')
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
  .post((req, res) => {
    const user = new User(req.body)

    user
      .save()
      .then(updatedUser => {
        res.status(201).json(updatedUser)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

module.exports = router
