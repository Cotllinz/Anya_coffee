const route = require('express').Router()
const {
  getAllPromo,
  getPromoById,
  AddPromo,
  updatePromo,
  deletePromo,
  getPromoLimit,
  getSortingAscPromo,
  searchPromo
} = require('../controller/promoController')
const { auth, authIsadmin } = require('../middleware/authentication')
const {
  clearDataPromoRedis,
  getPromoByIdRedis,
  getPromoRedislimit,
  getPromoRedis
} = require('../middleware/redisPromo')
route.get('/', getPromoRedis, getAllPromo)
route.get('/limit', getPromoRedislimit, getPromoLimit)
route.get('/sort', getSortingAscPromo)
route.get('/items', searchPromo)
route.get('/:id', getPromoByIdRedis, getPromoById)
route.post('/', auth, authIsadmin, clearDataPromoRedis, AddPromo)
route.patch('/:id', auth, authIsadmin, clearDataPromoRedis, updatePromo)
route.patch('/delete/:id', auth, authIsadmin, clearDataPromoRedis, deletePromo)
module.exports = route
