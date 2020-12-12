const routeing = require('express').Router()
const product = require('./routes/productRoute')
const promo = require('./routes/promoRoute')

routeing.use('/product', product)
routeing.use('/promo', promo)

module.exports = routeing
