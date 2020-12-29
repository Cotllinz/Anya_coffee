const route = require('express').Router()
const { getSBbyday, getSBbyYear } = require('../controller/dashboardController')

route.get('/day', getSBbyday)
route.get('/year', getSBbyYear)
module.exports = route
