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
  getHistoryDetailsByIduser: (id, historyId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select payment_method, invoice_payment, sub_total, history_product.create_at, qty, total, size_detail,status_delivery,status_table,name_product,image_product from history_product join detail_history on id_history = id_historydetails LEFT JOIN main_product ON detail_history.id_product = main_product.id_product  where user_id = ? && id_historydetails = ? && status_details = "ON"',
        [id, historyId],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getHistoryByIduser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from history_product where user_id = ? && status_history = "OFF"',
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
          /* console.log(newResult)
          console.log(err) */
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
          /*  console.log(newResult)
          console.log(err) */
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
  historyAdminConfirm: (data, id) => {
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
  getHistoryAdmin: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from history_product join detail_history on id_history = id_historydetails where status_details = "ON" && status_history = "OFF"',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
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
