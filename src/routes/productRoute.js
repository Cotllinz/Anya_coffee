const route = require('express').Router()
const {
  getProduct,
  AddProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controller/productController')

route.get('/', getProduct)
route.post('/', AddProduct)
route.get('/:id', getProductById)
route.patch('/:id', updateProduct)
route.patch('/delete/:id', deleteProduct)
module.exports = route
