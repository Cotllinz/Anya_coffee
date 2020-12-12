const connection = require('../config/mysql')

module.exports = {
  /* Get Product */
  getProductModel: (category, limit, offset, search) => {
    return new Promise((resolve, reject) => {
      if (category) {
        connection.query(
          'SELECT * FROM main_product JOIN category_product ON main_product.category_id = category_product.id_category JOIN size_typeproduct on main_product.category_id = size_typeproduct.id_sizeProduct WHERE category_product.id_category = ? && main_product.status_product = "ON" LIMIT ? OFFSET ?',
          [category, limit, offset],
          (err, result) => {
            /* console.log(result)
        console.log(err) */
            !err ? resolve(result) : reject(new Error(err))
          }
        )
      } else if (search) {
        connection.query(
          `SELECT * FROM main_product JOIN category_product ON main_product.category_id = category_product.id_category WHERE main_product.status_product = "ON" && main_product.name_product LIKE "%${search}%" limit ? offset ?`,
          [limit, offset],
          (err, result) => {
            /* console.log(result)
            console.log(err) */
            !err ? resolve(result) : reject(new Error(err))
          }
        )
      } else {
        connection.query(
          'SELECT * FROM main_product JOIN category_product ON main_product.category_id = category_product.id_category WHERE main_product.status_product = "ON" LIMIT ? OFFSET ?',
          [limit, offset],
          (err, result) => {
            /* console.log(result)
        console.log(err) */
            !err ? resolve(result) : reject(new Error(err))
          }
        )
      }
    })
  },
  /* Add Product */
  AddProductModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into main_product set ?',
        data,
        (err, result) => {
          /*  console.log(result)
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
        'select * from main_product where id_product = ?',
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
  getProductCount: (category, search) => {
    return new Promise((resolve, reject) => {
      /* Count Catagory */
      if (category) {
        connection.query(
          'select count(*) as total from main_product where status_product = "ON" && category_id = ?',
          category,
          (err, result) => {
            !err ? resolve(result[0].total) : reject(new Error(err))
          }
        )
      } else if (search) {
        connection.query(
          `select count(*) as total from main_product where status_product = "ON" && main_product.name_product LIKE "%${search}%"`,
          (err, result) => {
            !err ? resolve(result[0].total) : reject(new Error(err))
          }
        )
      } else {
        connection.query(
          'select count(*) as total from main_product where status_product = "ON"',
          (err, result) => {
            !err ? resolve(result[0].total) : reject(new Error(err))
          }
        )
      }
    })
  }
}
