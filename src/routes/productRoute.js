const route = require('express').Router()
const { getProduct, AddProduct } = require('../controller/productController')

route.get('/', getProduct)
route.post('/', AddProduct)
module.exports = route
