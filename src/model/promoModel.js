const connection = require('../config/mysql')

module.exports = {
  getAllPromoModal: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from coupon_product join size_typeproduct on coupon_product.product_id = size_typeproduct.id_Product join main_product on main_product.id_product = product_id where size_typeproduct.type ="Promo" && coupon_product.status_promo ="ON" && start_expired < end_expired order by id_coupon ASC',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
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
  getPromoLimitModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from coupon_product join size_typeproduct on coupon_product.product_id = size_typeproduct.id_Product join main_product on main_product.id_product = coupon_product.product_id where coupon_product.status_promo = "ON" && size_typeproduct.type = "Promo" && start_expired < end_expired order by id_coupon ASC LIMIT ? OFFSET ?',
        [limit, offset],
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
          /*  console.log(result)
          console.log(err) */
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
        'update size_typeproduct set ? where id_Product = ? && type ="Promo"',
        [data, id],
        (err, result) => {
          const newResult = {
            id_Product: id,
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
        'update size_typeproduct set ? where id_Product = ? && type ="Promo"',
        [data, id],
        (err, result) => {
          const newResult = {
            id_Product: id,
            ...data
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  getPromoCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select count(*) as total from coupon_product where status_promo = "ON" && start_expired < end_expired',
        (err, result) => {
          !err ? resolve(result[0].total) : reject(new Error(err))
        }
      )
    })
  }
}

/*  getPromoBySearch: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM coupon_product WHERE coupon_product.status_promo = "ON" && coupon_product.name_productPromo LIKE "%${search}%"`,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getPromoSort: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from coupon_product order by normal_price * (discount_coupon/100) ${sort}`,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }, */
