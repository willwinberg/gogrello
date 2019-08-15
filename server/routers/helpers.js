const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const sign = (payload) => jwt.sign(payload, process.env.ACCESS_KEY)

const decode = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_KEY)
  } catch (err) {
    console.error(err)
  }
}

const userExists = (req, res) => {
  if (!req.body.token || !decode(req.body.token) || !decode(req.body.token).email) {
    return res.send({ exist: 2, message: 'UNAUTHORIZED' })
  }

  const email = decode(req.body.token).email

  User.findOne({ email })
    .then(user => {
      res.send({ exist: 1, message: 'USER EXIST' })
    })
    .catch(() => {
      res.send({ exist: 0, message: 'EMAIL NOT USED' })
    })
}

const randomString = (length) => {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789-_=+'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

module.exports = {
  sign,
  decode,
  userExists,
  randomString
}
