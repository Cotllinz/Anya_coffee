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
route.get('/', getAllPromo)
route.get('/limit', getPromoLimit)
route.get('/sort', getSortingAscPromo)
route.get('/items', searchPromo)
route.get('/:id', getPromoById)
route.post('/', auth, authIsadmin, AddPromo)
route.patch('/:id', auth, authIsadmin, updatePromo)
route.patch('/delete/:id', auth, authIsadmin, deletePromo)
module.exports = route
