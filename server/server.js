const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gogrellodb').then(
  () => { console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database' + err) }
)
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 4000

app.listen(() => {
  console.log('Listening on port ' + port)
})