const express = require('express')
const smash = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(smash('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('*', (req, res) => {
  res.status(404).send('Not Found Please Check again ! :)')
})

app.listen(3000, () => {
  console.log('Express app is listening on 3000')
})
