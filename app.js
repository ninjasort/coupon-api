const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/')
const couponRouter = require('./routes/coupon')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.send(500, { message: err.message })
})

app.use('/', indexRouter)
app.use('/coupons', couponRouter)

module.exports = app
