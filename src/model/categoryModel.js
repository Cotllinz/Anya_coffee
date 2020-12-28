const connection = require('../config/mysql')

module.exports = {
  getProductcategory: (category) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from main_product join category_product on category_id = id_category where category_id = ? && status_product = "ON"',
        category,
        (err, result) => {
          /*   console.log(result)
          console.log(err) */
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  categoryLimit: (category, limit, offset, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from main_product join category_product on category_id = id_category where category_id = ${category} && status_product = "ON" ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (err, result) => {
          /* console.log(result)
          console.log(err) */
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  categoryCount: (category) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select count(*) as total from main_product where category_id = ${category} && status_product = "ON"`,
        (err, result) => {
          !err ? resolve(result[0].total) : reject(new Error(err))
        }
      )
    })
  }
}
