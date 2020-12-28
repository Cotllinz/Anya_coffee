const route = require('express').Router()
const {
  getProductandPromoCategory,
  getCategory
} = require('../controller/categoryController')
const { getCategoryRedis } = require('../middleware/redisProduct')
/* const {
  auth,
  authIsadmin,
  authIsAdminorUser
} = require('../middleware/authentication') */
route.get('/limit', getCategoryRedis, getCategory)
route.get('/:category', getProductandPromoCategory)

module.exports = route
