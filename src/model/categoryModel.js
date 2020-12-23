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
  }
}
