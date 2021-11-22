var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var csvRouter = require('./routes/csv')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/csv', csvRouter)

app.use(function (req, res) {
  res.status(404).send('Not found.')
})

app.use(function (error, req, res, next) {
  res.status(500).json(error)
  next(error)
})

module.exports = app
