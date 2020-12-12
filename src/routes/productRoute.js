const route = require('express').Router()
const {
  getProductandPromoProduct,
  AddProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  Productlimit,
  getSortingAscProduct,
  searchProduct
} = require('../controller/productController')

route.get('/', getProductandPromoProduct)
route.get('/limit', Productlimit)
route.post('/', AddProduct)
route.get('/sort', getSortingAscProduct)
route.get('/items', searchProduct)
route.get('/:id', getProductById)
route.patch('/:id', updateProduct)
route.patch('/delete/:id', deleteProduct)

module.exports = route
