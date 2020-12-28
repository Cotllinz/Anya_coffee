const connection = require('../config/mysql')

module.exports = {
  /* Get Product */
  getProductModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from main_product join size_typeproduct on main_product.id_product = size_typeproduct.id_sizeproduct where main_product.status_product = "ON" && size_typeproduct.type = "Product"',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  /* Get Promo */
  getPromoProductModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from main_product join coupon_product on coupon_product.code_coupon = main_product.code_discount join size_typeproduct on size_typeproduct.id_sizeProduct = coupon_product.id_coupon where main_product.status_product = "ON" && coupon_product.status_promo = "ON" && size_typeproduct.type = "Promo"',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getProductLimitModel: (limit, offset, search, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from main_product join size_typeproduct on main_product.id_product = size_typeproduct.id_sizeproduct where main_product.status_product = "ON" && size_typeproduct.type = "Product" && main_product.name_product LIKE "%${search}%" ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (err, result) => {
          /*  console.log(result)
          console.log(err) */
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  /* Add Product */
  AddProductModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into main_product set ?',
        data,
        (err, result) => {
          /*   console.log(result)
          console.log(err) */
          const NewResult = {
            id_product: result.insertId,
            ...data
          }
          !err ? resolve(NewResult) : reject(new Error(err))
        }
      )
    })
  },
  /* Add Product Size  */
  AddSizeidModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into size_typeproduct set ?',
        data,
        (err, result) => {
          const newResult = {
            ...data
          }
          /*  console.log(newResult)
          console.log(err) */
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  /* Get Product Id */
  getProductbyId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from main_product join size_typeproduct on main_product.id_product = size_typeproduct.id_sizeproduct where id_product = ?',
        id,
        (err, result) => {
          /*  console.log(result)
          console.log(err) */
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  /* Update Product */
  UpdateProductModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update main_product set ? where id_product = ?',
        [data, id],
        (err, result) => {
          const newResult = {
            id_product: id,
            ...data
          }
          /*   console.log(newResult)
          console.log(err)  */
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  /* Update Product Size */
  UpdateProductSizeModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update size_typeproduct set ? where id_sizeProduct = ? && type = "Product"',
        [data, id],
        (err, result) => {
          const newResult = {
            id_sizeProduct: id,
            ...data
          }
          /*  console.log(newResult)
          console.log(err) */
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  /* Delete Product */
  deleteProductModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update main_product set ? where id_product = ?',
        [data, id],
        (err, result) => {
          const newResult = {
            id_product: id,
            ...data
          }
          /*   console.log(newResult)
          console.log(err)  */
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  /* Delete Size Product */
  deleteSizeProductModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update size_typeproduct set ? where id_sizeProduct = ? && type = "Product"',
        [data, id],
        (err, result) => {
          const newResult = {
            id_sizeProduct: id,
            ...data
          }
          /* console.log(newResult)
          console.log(err) */
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  getProductCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select count(*) as total from main_product where status_product = "ON"',
        (err, result) => {
          !err ? resolve(result[0].total) : reject(new Error(err))
        }
      )
    })
  },
  getProductSearchCount: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select count(*) as total from main_product where status_product = "ON" && main_product.name_product LIKE "%${search}%"`,
        (err, result) => {
          !err ? resolve(result[0].total) : reject(new Error(err))
        }
      )
    })
  }
}

/*   getProductSort: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from main_product order by price_product ${sort}`,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  searchingProduct: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM main_product WHERE main_product.status_product = "ON" && main_product.name_product LIKE "%${search}%"`,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }, */
/*  getProductLimitModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from main_product join size_typeproduct on main_product.id_product = size_typeproduct.id_sizeproduct where main_product.status_product = "ON" && size_typeproduct.type = "Product" LIMIT ? OFFSET ?',
        [limit, offset],
        (err, result) => {

          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }, */
