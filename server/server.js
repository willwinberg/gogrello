const express = require('express')
// const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
// const passport = require('passport')
const morgan = require('morgan')
// const strategies = require('./strategies')
const mongoose = require('mongoose')
const taskRouter = require('./routers/taskRouter.js')
const userRouter = require('./routers/userRouter.js')
// const { userExists } = require('./routers/helpers')
var birds = require('./routers/birds')

mongoose.connect('mongodb://localhost:27017/gogrellodb', { useNewUrlParser: true }).then(
  () => { debugger; console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database' + err) }
)

const app = express()
const originUrl = process.env.NODE_ENV === 'production'
  ? 'https://www.appname.com' : 'http://localhost:8080'

app.use(express.static('public'))
app.use(morgan('combined'))
app.use(express.json())
app.use(cors({
  origin: (originUrl),
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(helmet())
// app.use(passport.initialize())
// app.use(passport.session())
// strategies()

const User = require('./models/userModel')
console.log(User)

app.get('/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(response => {
      console.log('fount')
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json({ message: err.message }))
})

app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)
// app.post('/api/exists', userExists)
app.use('/birds', birds)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
