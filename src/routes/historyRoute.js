const route = require('express').Router()
const {
  addHistory,
  addDetails,
  getHistory,
  getHistoryDetailsbyid,
  deleteHistory,
  searchHistory,
  AdminConfirmOrder,
  getAdminHistory,
  getHistorybyid
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
  getHistoryAdminRedis,
  getHistoryDetailsByIdRedis
} = require('../middleware/redisHistory')
route.get('/', auth, authIsAdminorUser, getHistoryRedis, getHistory)
route.get('/admin', auth, authIsadmin, getHistoryAdminRedis, getAdminHistory)
route.get('/search', auth, authIsAdminorUser, searchHistory)
route.get(
  '/history/:id',
  auth,
  authIsAdminorUser,
  getHistoryByIdRedis,
  getHistorybyid
)
route.get(
  '/historydetails',
  auth,
  authIsAdminorUser,
  getHistoryDetailsByIdRedis,
  getHistoryDetailsbyid
)
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
