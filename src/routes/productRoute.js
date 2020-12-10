const route = require('express').Router()
const {
  getProduct,
  AddProduct,
  getProductById
} = require('../controller/productController')

route.get('/', getProduct)
route.post('/', AddProduct)
route.get('/:id', getProductById)
module.exports = route
