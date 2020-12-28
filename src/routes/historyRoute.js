const route = require('express').Router()
const {
  addHistory,
  addDetails,
  getHistory,
  getbyid,
  deleteHistory,
  searchHistory,
  AdminConfirmOrder,
  getAdminHistory
} = require('../controller/historyController')
const {
  auth,
  authIsAdminorUser,
  authIsadmin
} = require('../middleware/authentication')
const {
  clearDataHistoryRedis,
  getHistoryByIdRedis,
  getHistoryRedis,
  getHistoryAdminRedis
} = require('../middleware/redisHistory')
route.get('/', auth, authIsAdminorUser, getHistoryRedis, getHistory)
route.get('/admin', auth, authIsadmin, getHistoryAdminRedis, getAdminHistory)
route.get('/search', auth, authIsAdminorUser, searchHistory)
route.get('/:id', auth, authIsAdminorUser, getHistoryByIdRedis, getbyid)
route.post('/', auth, authIsAdminorUser, clearDataHistoryRedis, addHistory)
route.post(
  '/details',
  auth,
  authIsAdminorUser,
  clearDataHistoryRedis,
  addDetails
)
route.patch(
  '/:id',
  auth,
  authIsAdminorUser,
  clearDataHistoryRedis,
  deleteHistory
)
route.patch(
  '/admin/:id',
  auth,
  authIsadmin,
  clearDataHistoryRedis,
  AdminConfirmOrder
)
module.exports = route
