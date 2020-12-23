const route = require('express').Router()
const {
  addHistory,
  addDetails,
  getHistory,
  getbyid,
  deleteHistory,
  searchHistory
} = require('../controller/historyController')
const {
  auth,
  authIsAdminorUser
} = require('../middleware/authentication')
route.get('/', auth, authIsAdminorUser, getHistory)
route.get('/search', auth, authIsAdminorUser, searchHistory)
route.get('/:id', auth, authIsAdminorUser, getbyid)
route.post('/', auth, authIsAdminorUser, addHistory)
route.post('/details', auth, authIsAdminorUser, addDetails)
route.patch('/:id', auth, authIsAdminorUser, deleteHistory)
module.exports = route
