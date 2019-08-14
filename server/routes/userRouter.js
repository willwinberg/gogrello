const express = require('express')
const User = require('../models/UserModel')
const router = express.Router()

router.route('/create').post((req, res) => {
  const user = new User(req.body)
  user.save().then(user => {
    res.status(200).json({ 'message': 'User successfully added ' })
  })
    .catch(err => {
      res.status(400).send('Error when saving to database:\n', err)
    })
})

router.route('/users').get((req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err)
    } else {
      res.json(users)
    }
  })
})

router.route('/users/:id').get((req, res) => {
  const id = req.params.id
  User.findById(id, (err, user) => {
    res.json(user)
  })
})

router.route('/users/:id').put((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) { return next(new Error('Error getting the user!')) } else {
      user.name = req.body.name
      user.save().then(user => {
        res.json('User updated successfully')
      })
        .catch(err => {
          res.status(400).send('Error when updating the user')
        })
    }
  })
})

router.route('/users/:id').get((req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
    if (err) res.json(err)
    else res.json('User successfully removed')
  })
})
