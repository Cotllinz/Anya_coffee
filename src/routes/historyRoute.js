const route = require('express').Router()
const {
  addHistory,
  addDetails,
  getHistory,
  getbyid,
  deleteHistory,
  searchHistory
} = require('../controller/historyController')
const { auth, authIsAdminorUser } = require('../middleware/authentication')
const {
  clearDataHistoryRedis,
  getHistoryByIdRedis,
  getHistoryRedis
} = require('../middleware/redisHistory')
route.get('/', auth, authIsAdminorUser, getHistoryRedis, getHistory)
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
module.exports = route
