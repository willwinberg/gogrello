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
var birds = require('./routers/birds')

mongoose.connect('mongodb://localhost:27017/gogrellodb', { useNewUrlParser: true }).then(
  () => { console.log('Database connection is successful') },
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
app.use(passport.initialize())
app.use(passport.session())

strategies()

// app.get('/', function (req, res) {
//   res.json({ api: 'Running...' })
// })

app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)
app.post('/api/exists', userExists)
app.use('/birds', birds)

const port = process.env.PORT || 4000

app.listen(() => {
  console.log('Listening on port ' + port)
})
