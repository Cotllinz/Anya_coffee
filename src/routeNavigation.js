const routeing = require('express').Router()
const product = require('./routes/productRoute')

routeing.use('/product', product)

module.exports = routeing
