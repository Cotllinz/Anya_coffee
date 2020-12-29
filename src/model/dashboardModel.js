const connection = require('../config/mysql')

module.exports = {
  getSubtotalbyDayModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(history_product.sub_total) AS totalPrice FROM history_product WHERE DAY(history_product.create_at)  = DAY(NOW()) GROUP BY DAY(history_product.create_at)',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getSubtotalbyYearModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(history_product.sub_total) AS totalPrice FROM history_product WHERE YEAR(history_product.create_at)  = YEAR(NOW()) GROUP BY YEAR(history_product.create_at)',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getTotalorderbyMonth: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT count(history_product.id_history) AS totalOrder FROM history_product WHERE MONTH(history_product.create_at) = MONTH(NOW()) GROUP BY MONTH(history_product.create_at)',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
