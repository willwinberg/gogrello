const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/UserModel')
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
