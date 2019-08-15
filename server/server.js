const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')
const morgan = require('morgan')
const strategies = require('./strategies')
const mongoose = require('mongoose')

const taskRouter = require('./routers/taskRouter.js')
const userRouter = require('./routers/userRouter.js')
const { userExists } = require('./routers/helpers')

mongoose.connect('mongodb://localhost:27017/gogrellodb').then(
  () => { console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database' + err) }
)

const server = express()
const originUrl = process.env.NODE_ENV === 'production'
  ? 'https://www.appname.com' : 'http://localhost:8080'

server.use(express.static('public'))
server.use(morgan('combined'))
server.use(express.json())
server.use(cors({
  origin: (originUrl),
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
server.use(helmet())
server.use(passport.initialize())
server.use(passport.session())

strategies()

// server.get('/', function (req, res) {
//   res.json({ api: 'Running...' })
// })

server.use('/api/users', userRouter)
server.use('/api/tasks', taskRouter)
server.post('/api/exists', userExists)

const port = process.env.PORT || 4000

server.listen(() => {
  console.log('Listening on port ' + port)
})
