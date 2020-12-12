const route = require('express').Router()
const {
  getAllPromo,
  getPromoById,
  AddPromo,
  updatePromo,
  deletePromo
} = require('../controller/promoController')

route.get('/', getAllPromo)
route.get('/:id', getPromoById)
route.post('/', AddPromo)
route.patch('/:id', updatePromo)
route.patch('/delete/:id', deletePromo)
module.exports = route
