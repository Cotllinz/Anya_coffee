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

route.get('/', getAllPromo)
route.get('/limit', getPromoLimit)
route.get('/sort', getSortingAscPromo)
route.get('/items', searchPromo)
route.get('/:id', getPromoById)
route.post('/', AddPromo)
route.patch('/:id', updatePromo)
route.patch('/delete/:id', deletePromo)
module.exports = route
