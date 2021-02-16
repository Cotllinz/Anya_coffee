const route = require('express').Router()
const {
  getSBbyday,
  getSBbyYear,
  getTObyMount,
  getMountChart
} = require('../controller/dashboardController')

route.get('/day', getSBbyday)
route.get('/year', getSBbyYear)
route.get('/month', getTObyMount)
route.get('/chartMount', getMountChart)
module.exports = route
