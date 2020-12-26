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

route.get('/', getProductandPromoProduct)
route.get('/limit', Productlimit)
route.get('/promo', auth, authIsAdminorUser, getProductPromoProduct)
route.post('/', auth, authIsadmin, uploadFilterProduct, AddProduct)
route.get('/sort', getSortingAscProduct)
route.get('/items', searchProduct)
route.get('/:id', getProductById)
route.patch('/:id', auth, authIsadmin, uploadFilterProduct, updateProduct)
route.patch('/delete/:id', auth, authIsadmin, deleteProduct)

module.exports = route
