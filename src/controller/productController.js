const {
  getProductModel,
  AddProductModel,
  AddSizeidModel,
  getProductbyId,
  UpdateProductModel,
  UpdateProductSizeModel,
  deleteProductModel,
  deleteSizeProductModel,
  getProductCount
} = require('../model/productModel')
const helper = require('../helper/response')
const qs = require('querystring')
module.exports = {
  getProduct: async (req, res) => {
    try {
      /* Paging Main Product and Sorting Product By Category */
      let { page, limit, category, search } = req.query
      /* Get Size Product Belum */
      const getPage = search ? (page = 1) : page
      page = parseInt(getPage)
      limit = parseInt(limit)
      category = parseInt(category)
      const totalProduct = await getProductCount(category, search)
      const totalPage = Math.ceil(totalProduct / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null
      /* ======================================= */

      const newPage = {
        page,
        limit,
        totalPage,
        category,
        totalProduct,
        nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/product?${prevLink}`
      }
      const resultProduct = await getProductModel(
        category,
        limit,
        offset,
        search
      )
      return helper.response(
        res,
        200,
        'Succes GET Product',
        resultProduct,
        newPage
      )
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
        statusProduct,
        sizeL,
        sizeR,
        sizeXL,
        size200,
        size350,
        size400
      } = req.body
      const size = [sizeL, sizeR, sizeXL, size200, size350, size400]
      const NewSize = size.filter((e) => e === 'ON')
      if (
        nameProduct &&
        imageProduct &&
        priceProduct &&
        descProduct &&
        qtyProduct &&
        categoryId
      ) {
        if (NewSize.length >= 2) {
          if (categoryId > 0 && categoryId <= 5) {
            const addData = {
              name_product: nameProduct,
              image_product: imageProduct,
              price_product: priceProduct,
              desc_product: descProduct,
              qty_product: qtyProduct,
              category_id: categoryId,
              status_product: statusProduct || 'ON',
              create_at: new Date()
            }

            const resultAddData = await AddProductModel(addData)
            const AddSize = {
              id_sizeProduct: resultAddData.id_product,
              size_L: sizeL || 'OFF',
              size_R: sizeR || 'OFF',
              size_XL: sizeXL || 'OFF',
              size_200: size200 || 'OFF',
              size_350: size350 || 'OFF',
              size_400: size400 || 'OFF',
              type: 'Product',
              status_product: resultAddData.status_product
            }
            await AddSizeidModel(AddSize)
            return helper.response(
              res,
              200,
              'Succes Add Product',
              resultAddData
            )
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
            'Can You Input Size Minimum 2 Size Please'
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
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getProductbyId(id)
      return result.length > 0
        ? helper.response(res, 200, 'Success Get Product by id', result)
        : helper.response(res, 404, `Product By Id : ${id} Not found`)
    } catch (err) {
      return helper.response(res, 400, 'Invalid Get Product', err)
    }
  },
  /* Update Product */
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params
      const {
        nameProduct,
        imageProduct,
        priceProduct,
        descProduct,
        qtyProduct,
        categoryId,
        statusProduct,
        sizeL,
        sizeR,
        sizeXL,
        size200,
        size350,
        size400
      } = req.body
      const checkId = await getProductbyId(id)
      if (checkId.length > 0) {
        if (
          nameProduct &&
          imageProduct &&
          priceProduct &&
          descProduct &&
          qtyProduct &&
          categoryId
        ) {
          if (categoryId > 0 && categoryId <= 5) {
            const updateData = {
              name_product: nameProduct,
              image_product: imageProduct,
              price_product: priceProduct,
              desc_product: descProduct,
              qty_product: qtyProduct,
              category_id: categoryId,
              status_product: statusProduct || 'ON',
              update_at: new Date()
            }

            const resultUpdateData = await UpdateProductModel(updateData, id)
            const updateSize = {
              size_L: sizeL || 'OFF',
              size_R: sizeR || 'OFF',
              size_XL: sizeXL || 'OFF',
              size_200: size200 || 'OFF',
              size_350: size350 || 'OFF',
              size_400: size400 || 'OFF',
              status_product: resultUpdateData.status_product
            }
            await UpdateProductSizeModel(updateSize, id)
            return helper.response(
              res,
              200,
              `Succes Update Product ${id}`,
              resultUpdateData
            )
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
      } else {
        return helper.response(res, 404, `Product by Id : ${id} Not Found`)
      }
    } catch (err) {
      return helper.response(res, 400, 'Invalid Update Product', err)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await getProductbyId(id)

      if (checkId.length > 0) {
        const deleteData = {
          delete_at: new Date(),
          status_product: 'OFF'
        }
        const deleteResult = await deleteProductModel(deleteData, id)
        const deleteSize = {
          status_product: deleteResult.status_product
        }
        await deleteSizeProductModel(deleteSize, id)
        return helper.response(res, 200, `Succes Delete Product ${id}`)
      } else {
        return helper.response(res, 404, `Product by Id : ${id} Not Found`)
      }
    } catch (err) {
      return helper.response(res, 400, 'Invalid Delete Product', err)
    }
  }
}
