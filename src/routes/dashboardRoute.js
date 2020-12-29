const route = require('express').Router()
const {
  getSBbyday,
  getSBbyYear,
  getTObyMount
} = require('../controller/dashboardController')

route.get('/day', getSBbyday)
route.get('/year', getSBbyYear)
route.get('/month', getTObyMount)
module.exports = route
