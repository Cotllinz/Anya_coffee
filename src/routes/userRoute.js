const route = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser
} = require('../controller/userController')
const { uploadFilterUser } = require('../middleware/multer')
const { auth, authIsAdminorUser } = require('../middleware/authentication')
route.get('/email/:email', auth, authIsAdminorUser, getUser)
route.post('/register', registerUser)
route.post('/login', loginUser)
route.patch(
  '/update/:email',
  auth,
  authIsAdminorUser,
  uploadFilterUser,
  updateUser
)

route.delete('/delete/:email', auth, authIsAdminorUser, deleteUser)

module.exports = route
