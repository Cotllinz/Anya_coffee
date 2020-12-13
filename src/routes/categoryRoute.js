const route = require('express').Router()
const {
  getProductandPromoCategory
} = require('../controller/categoryController')

route.get('/:category', getProductandPromoCategory)

module.exports = route
