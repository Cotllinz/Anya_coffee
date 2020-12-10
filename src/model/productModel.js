const connection = require('../config/mysql')

module.exports = {
  /* Get Product */
  getProductModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('select * from main_product', (err, result) => {
        /* console.log(result)
        console.log(err) */
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },
  AddProductModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into main_product set ?',
        data,
        (err, result) => {
          const NewResult = {
            id_product: result.insertId,
            ...data
          }
          !err ? resolve(NewResult) : reject(new Error(err))
        }
      )
    })
  }
}
