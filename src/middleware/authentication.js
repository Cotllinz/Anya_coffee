const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
module.exports = {
  auth: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'SignIn', (err, result) => {
        if (
          (err && err.name === 'JsonWebTokenError') ||
          (err && err.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 400, 'Login First', err.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(res, 400, 'Please Login First !')
    }
  },
  authIsadmin: (req, res, next) => {
    if (req.decodeToken.role === 1 && req.decodeToken.statusUser === 'ON') {
      next()
    } else {
      return helper.response(res, 400, 'You Are Not Admin :(')
    }
  },
  authIsAdminorUser: (req, res, next) => {
    if (
      req.decodeToken.role === 1 ||
      (req.decodeToken.role === 0 && req.decodeToken.statusUser === 'ON')
    ) {
      next()
    } else {
      return helper.response(res, 400, 'Who You are ? :(')
    }
  }
}
