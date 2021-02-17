const helper = require('../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const nodemailer = require('nodemailer')
require('dotenv').config()
const {
  regisUserModel,
  loginUsermodel,
  TurnOnStatus,
  updateUserModel,
  deleteUserModel
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
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.user,
              pass: process.env.pass
            }
          })
          const mailOPtion = {
            from: `${process.env.user}`,
            to: `${userEmail}`,
            subject: `Hello ${userName}, Anya Coffee`,
            html: `<h2>Hello ${userName} Thanks You for Register in Anya Coffee for activation your account please login first</h2>
                  <p>Click This Link For Activation ur account</p>
                  <a href ="http://localhost:8081/Login">Activation Email</a>`
          }
          transporter.sendMail(mailOPtion, (err, result) => {
            if (err) {
              return helper.response(res, 400, 'Error Send Email', err)
            } else {
              console.log('Success Send Email !!!')
            }
          })
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
      const result = await loginUsermodel(userEmail)
      const setData = {
        status: 'ON'
      }
      const status = await TurnOnStatus(setData, userEmail)
      if (result.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          result[0].password
        )
        if (checkPassword) {
          const userRoles = result[0].roles === 1 ? 'Admin' : ''
          if (result[0].status === 'OFF') {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.user,
                pass: process.env.pass
              }
            })
            const mailOPtion = {
              from: `${process.env.user}`,
              to: `${result[0].email_user}`,
              subject: `Thanks You ${userRoles} ${result[0].username} || Anya Coffee`,
              html: `<h2>Hello ${userRoles} ${result[0].username} Thanks You for activation your account Enjoy Shopping</h2>`
            }

            transporter.sendMail(mailOPtion, (err, result) => {
              if (err) {
                return helper.response(res, 400, 'Error Send Email', err)
              } else {
                console.log('Success Send Email !!!')
              }
            })
          }
          const {
            id_user: userId,
            username: userName,
            email_user: userEmail,
            roles: role
          } = result[0]
          const payload = {
            userId,
            userName,
            userEmail,
            role
          }
          const statusUs = {
            statusUser: status.status
          }
          const getAll = { ...payload, ...statusUs }
          const token = await jwt.sign(getAll, 'SignIn', {
            expiresIn: '3h'
          })
          const resulting = await { ...payload, ...statusUs, token }

          return helper.response(
            res,
            200,
            `Success Login username ${userName}`,
            resulting
          )
        } else {
          return helper.response(
            res,
            404,
            'The password you entered is incorrect !! please check again :)'
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
  },
  getUser: async (req, res) => {
    try {
      const { email } = req.params
      const result = await loginUsermodel(email)
      if (result.length > 0) {
        return helper.response(res, 200, `Success Get Email ${email}`, result)
      } else {
        return helper.response(
          res,
          400,
          `Your Email ${email} not Registed ! Please Sign up First`
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  updateUser: async (req, res) => {
    try {
      const { email } = req.params
      const getEmail = await loginUsermodel(email)
      const {
        userName,
        userPassword,
        firstName,
        lastName,
        dateBirth,
        phoneNumber,
        addressUser,
        Gender
      } = req.body
      if (getEmail.length > 0) {
        if (userName) {
          let updatepass
          if (userPassword) {
            const salt = bcrypt.genSaltSync(10)
            const ecryptPass = bcrypt.hashSync(userPassword, salt)
            updatepass = { password: ecryptPass }
          }
          let imageUser
          if (req.file === undefined) {
            imageUser = {
              image_user: getEmail[0].image_user
            }
          } else if (
            getEmail[0].image_user === null ||
            getEmail[0].image_user === ''
          ) {
            imageUser = {
              image_user: req.file === undefined ? '' : req.file.filename
            }
          } else if (req.file.filename !== getEmail[0].image_user) {
            fs.stat(
              `./userImage/${getEmail[0].image_user}`,
              function (_err, stats) {
                fs.unlink(`./userImage/${getEmail[0].image_user}`, (_err) => {
                  console.log(`Success Delete Image ${getEmail[0].image_user}`)
                })
              }
            )

            imageUser = {
              image_user: req.file === undefined ? '' : req.file.filename
            }
          }
          const updateUser = {
            username: userName,
            first_name: firstName,
            last_name: lastName,
            date_birth: dateBirth,
            phone_number: phoneNumber,
            address_user: addressUser,
            gender: Gender,
            status: 'ON',
            update_at: new Date()
          }
          const fullobj = { ...updateUser, ...updatepass, ...imageUser }
          const result = await updateUserModel(fullobj, email)
          return helper.response(
            res,
            200,
            `Success Update for username ${userName}`,
            result
          )
        } else {
          return helper.response(res, 400, "username can't be empty")
        }
      } else {
        return helper.response(res, 400, `Your Email ${email} not found`)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { email } = req.params
      const checkEmail = await loginUsermodel(email)
      if (checkEmail.length > 0) {
        if (checkEmail[0].image_user) {
          fs.unlink(`./userImage/${checkEmail[0].image_user}`, (err) => {
            if (err) throw err
            // if no error, file has been deleted successfully
            console.log(`Success Delete Image ${checkEmail[0].image_user}`)
          })
        }
        await deleteUserModel(email)
        return helper.response(res, 200, `Success Delete email ${email}`)
      } else {
        return helper.response(res, 400, `Your Email ${email} not found`)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
