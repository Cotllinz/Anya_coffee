const route = require('express').Router()
const {
  getProductandPromoCategory
} = require('../controller/categoryController')
/* const {
  auth,
  authIsadmin,
  authIsAdminorUser
} = require('../middleware/authentication') */

route.get('/:category', getProductandPromoCategory)

module.exports = route
