const connection = require('../config/mysql')

module.exports = {
  getAllPromoModal: () => {
    return new Promise((resolve, reject) => {
      connection.query('select * from coupon_product', (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },
  getPromoByIdModal: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from coupon_product where id_coupon = ?',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  addPromoModal: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into coupon_product set ?',
        data,
        (err, result) => {
          const newResult = {
            id_coupon: result.insertId,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  addSizePromoModal: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into size_typeproduct set ?',
        data,
        (err, result) => {
          const newResult = {
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updatePromoModal: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update coupon_product set ? where id_coupon = ?',
        [data, id],
        (err, result) => {
          const newResult = {
            id_coupon: id,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updateSizePromoModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update size_typeproduct set ? where id_sizeProduct = ? && type ="Promo"',
        [data, id],
        (err, result) => {
          const newResult = {
            id_sizeProduct: id,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  deletePromoModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update coupon_product set ? where id_coupon = ?',
        [data, id],
        (err, result) => {
          const newResult = {
            id_coupon: id,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  deleteSizePromoModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update size_typeproduct set ? where id_sizeProduct = ? && type ="Promo"',
        [data, id],
        (err, result) => {
          const newResult = {
            id_sizeProduct: id,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  }
}
