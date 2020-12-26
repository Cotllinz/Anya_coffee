const route = require('express').Router()
const {
  getProductandPromoProduct,
  AddProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductPromoProduct,
  Productlimit,
  getSortingAscProduct,
  searchProduct
} = require('../controller/productController')
const {
  auth,
  authIsadmin,
  authIsAdminorUser
} = require('../middleware/authentication')
const { uploadFilterProduct } = require('../middleware/multer')
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedislimit,
  getProducthaveaPromoRedis,
  getProductRedis
} = require('../middleware/redisProduct')

route.get('/', getProductRedis, getProductandPromoProduct)
route.get('/limit', getProductRedislimit, Productlimit)
route.get(
  '/promo',
  auth,
  authIsAdminorUser,
  getProducthaveaPromoRedis,
  getProductPromoProduct
)
route.post(
  '/',
  auth,
  authIsadmin,
  clearDataProductRedis,
  uploadFilterProduct,
  AddProduct
)
route.get('/sort', getSortingAscProduct)
route.get('/items', searchProduct)
route.get('/:id', getProductByIdRedis, getProductById)
route.patch(
  '/:id',
  auth,
  authIsadmin,
  clearDataProductRedis,
  uploadFilterProduct,
  updateProduct
)
route.patch(
  '/delete/:id',
  auth,
  authIsadmin,
  clearDataProductRedis,
  deleteProduct
)

module.exports = route
