const connection = require('../config/mysql')

module.exports = {
  regisUserModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('insert into user set ?', data, (err, result) => {
        const newResult = {
          id_user: result.insertId,
          ...data
        }
        delete newResult.password
        !err ? resolve(newResult) : reject(new Error(err))
      })
    })
  },
  loginUsermodel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from user where email_user = ?',
        email,
        (err, result) => (!err ? resolve(result) : reject(new Error(err)))
      )
    })
  },
  TurnOnStatus: (data, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user set ? where email_user = ?',
        [data, email],
        (err, result) => {
          /*     console.log(err)
          console.log(result) */
          const newResult = {
            email_user: email,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updateUserModel: (data, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user set ? where email_user = ?',
        [data, email],
        (err, result) => {
          /*   console.log(err)
          console.log(result) */
          const newResult = {
            email_user: email,
            ...data
          }
          delete newResult.password
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  deleteUserModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'delete from user where email_user = ?',
        email,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
