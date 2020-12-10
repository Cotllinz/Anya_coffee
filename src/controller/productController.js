const { getProductModel, AddProductModel } = require('../model/productModel')
const helper = require('../helper/response')
module.exports = {
  getProduct: async (req, res) => {
    try {
      const resultProduct = await getProductModel()
      return helper.response(res, 200, 'Succes GET Product', resultProduct)
    } catch (err) {
      return helper.response(res, 400, 'Invalid GET Product', err)
    }
  },
  AddProduct: async (req, res) => {
    try {
      const {
        nameProduct,
        imageProduct,
        priceProduct,
        descProduct,
        qtyProduct,
        categoryId,
        promoId,
        statusProduct
      } = req.body
      if (
        nameProduct &&
        imageProduct &&
        priceProduct &&
        descProduct &&
        qtyProduct &&
        categoryId &&
        promoId
      ) {
        if (categoryId > 0 && categoryId <= 5) {
          const addData = {
            name_product: nameProduct,
            image_product: imageProduct,
            price_product: priceProduct,
            desc_product: descProduct,
            qty_product: qtyProduct,
            category_id: categoryId,
            promo_id: promoId,
            status_product: statusProduct || 'ON',
            create_at: new Date()
          }
          const resultAddData = await AddProductModel(addData)
          return helper.response(res, 200, 'Succes Add Product', resultAddData)
        } else {
          return helper.response(
            res,
            404,
            'Category cant be below 0 or above 5!! check again'
          )
        }
      } else {
        return helper.response(
          res,
          404,
          'Check Product Again !!!, input cant be empty'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Invalid Add Product', err)
    }
  }
}
