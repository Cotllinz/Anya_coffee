const route = require('express').Router()
const {
  getProductandPromoProduct,
  AddProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductPromoProduct,
  Productlimit
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
const { clearDataPromoRedis } = require('../middleware/redisPromo')

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

route.get('/:id', getProductByIdRedis, getProductById)
route.patch(
  '/:id',
  auth,
  authIsadmin,
  clearDataProductRedis,
  clearDataPromoRedis,
  uploadFilterProduct,
  updateProduct
)
route.patch(
  '/delete/:id',
  auth,
  authIsadmin,
  clearDataProductRedis,
  clearDataPromoRedis,
  deleteProduct
)

module.exports = route
/* route.get('/sort', getSortingAscProduct)
route.get('/items', searchProduct) */
