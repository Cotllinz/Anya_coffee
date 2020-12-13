const connection = require('../config/mysql')

module.exports = {
  getHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from history_product join detail_history on id_history = id_historydetails where status_details = "ON"',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getByIduser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from history_product join detail_history on id_history = id_historydetails where user_id = ? && status_details = "ON"',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  addHistory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into history_product set ?',
        data,
        (err, result) => {
          const newResult = {
            id_history: result.insertId,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  addDetailsHistory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into detail_history set ?',
        data,
        (err, result) => {
          const newResult = {
            id_detail: result.insertId,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  deleteHistoryModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update history_product set ? where id_history = ?',
        [data, id],
        (err, result) => {
          const newResult = {
            id_history: id,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  offDetailsHistory: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update detail_history set ? where id_historydetails = ?',
        [data, id],
        (err, result) => {
          const newResult = {
            id_history: id,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  searchHistory: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history_product join detail_history on id_history = id_historydetails WHERE status_details = "ON" && invoice_payment LIKE "%${search}%"`,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
