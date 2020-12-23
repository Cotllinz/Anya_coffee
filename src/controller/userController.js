const helper = require('../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  regisUserModel,
  loginUsermodel,
  TurnOnStatus
} = require('../model/userModel')
module.exports = {
  registerUser: async (req, res) => {
    try {
      const { userName, userEmail, userPassword, phoneNumber, roles } = req.body
      const checkEmail = await loginUsermodel(userEmail)
      if (userName && userEmail && userPassword) {
        if (checkEmail.length >= 1) {
          return helper.response(
            res,
            400,
            `Invalid Register ${userEmail}, Your email has already been registered`
          )
        } else {
          const salt = bcrypt.genSaltSync(10)
          const ecryptPass = bcrypt.hashSync(userPassword, salt)
          const setData = {
            username: userName,
            email_user: userEmail,
            password: ecryptPass,
            phone_number: phoneNumber || 0,
            roles: roles || 0,
            create_at: new Date()
          }
          const result = await regisUserModel(setData)
          return helper.response(
            res,
            200,
            `Success Register Account ${userName} :)`,
            result
          )
        }
      } else {
        return helper.response(
          res,
          400,
          'Input username, email and password cant be empty !!! please check again'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Reqquest', err)
    }
  },
  loginUser: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const setData = {
        status: 'ON'
      }
      await TurnOnStatus(setData, userEmail)
      const result = await loginUsermodel(userEmail)
      if (result.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          result[0].password
        )
        if (checkPassword) {
          const {
            id_user: userId,
            username: userName,
            email_user: userEmail,
            roles: role,
            status: statusUser
          } = result[0]
          const payload = {
            userId,
            userName,
            userEmail,
            role,
            statusUser
          }
          const token = await jwt.sign(payload, 'SignIn', { expiresIn: '3h' })
          const resulting = await { ...payload, token }
          return helper.response(
            res,
            200,
            `Success Login username ${userName}`,
            resulting
          )
        }
      } else {
        return helper.response(
          res,
          400,
          `Your Email ${userEmail} not Registed ! Please Sign up First`
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
