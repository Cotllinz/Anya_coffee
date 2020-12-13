const express = require('express')
const smash = require('morgan')
const bodyParser = require('body-parser')
const routeNavigation = require('./src/routeNavigation')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(smash('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT
app.use('/', routeNavigation)
app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})
app.get('*', (req, res) => {
  res.status(404).send('Not Found Please Check again ! :)')
})

app.listen(port, () => {
  console.log('Express app is listening on ' + port)
})
