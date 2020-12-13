const route = require('express').Router()
const {
  addHistory,
  addDetails,
  getHistory,
  getbyid,
  deleteHistory,
  searchHistory
} = require('../controller/historyController')
route.get('/', getHistory)
route.get('/search', searchHistory)
route.get('/:id', getbyid)
route.post('/', addHistory)
route.post('/details', addDetails)
route.patch('/:id', deleteHistory)
module.exports = route
