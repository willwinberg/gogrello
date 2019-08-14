const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const taskRouter = require('./routes/taskRouter.js')

mongoose.connect('mongodb://localhost:27017/gogrellodb').then(
  () => { console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database' + err) }
)
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.use('/tasks', taskRouter)

// app.get('/', function (req, res) {
//   res.json({ api: 'Running...' })
// })

const port = process.env.PORT || 4000

app.listen(() => {
  console.log('Listening on port ' + port)
})
