const {
  getProductModel,
  getPromoProductModel,
  AddProductModel,
  AddSizeidModel,
  getProductbyId,
  UpdateProductModel,
  UpdateProductSizeModel,
  deleteProductModel,
  deleteSizeProductModel,
  getProductCount,
  getProductLimitModel,
  getProductSort,
  /* getProductSearchCount, */
  searchingProduct
} = require('../model/productModel')
const helper = require('../helper/response')
const qs = require('querystring')
const fs = require('fs')
module.exports = {
  getProductandPromoProduct: async (req, res) => {
    try {
      const result = await getProductModel()
      return helper.response(res, 200, 'Succes GET Product', result)
    } catch (err) {
      return helper.response(res, 400, 'Invalid GET Product and Promo', err)
    }
  },
  getProductPromoProduct: async (req, res) => {
    try {
      const result = await getPromoProductModel()
      return helper.response(res, 200, 'Succes Claim Promo Product', result)
    } catch (err) {
      return helper.response(res, 400, 'Invalid Claim Promo Product', err)
    }
  },
  Productlimit: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalProduct = await getProductCount()
      const totalPage = Math.ceil(totalProduct / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null
      const newPage = {
        page,
        limit,
        totalPage,
        totalProduct,
        nextLink: nextLink && `http://localhost:3000/product/limit?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/product/limit?${prevLink}`
      }
      const resultProduct = await getProductLimitModel(limit, offset)
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
  getSortingAscProduct: async (req, res) => {
    try {
      const { sort } = req.query
      console.log(sort)
      const result = await getProductSort(sort)
      return helper.response(res, 200, 'Success Sort and GET Product', result)
    } catch (err) {
      return helper.response(res, 400, 'Invalid GET Sort Product', err)
    }
  },
  searchProduct: async (req, res) => {
    try {
      const { search } = req.query
      const resultSearchProduct = await searchingProduct(search)
      return helper.response(
        res,
        200,
        'Success GET Product',
        resultSearchProduct
      )
    } catch (err) {
      return helper.response(res, 400, 'Invalid GET Search Product', err)
    }
  },
  AddProduct: async (req, res) => {
    try {
      const {
        nameProduct,
        priceProduct,
        descProduct,
        qtyProduct,
        codeDiscount,
        categoryId,
        timestart,
        timeend,
        homeDeliv,
        dineIn,
        takeaway,
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
      const delivery = [dineIn, takeaway, homeDeliv]
      const deliveryType = delivery.filter((e) => e === 'ON')
      if (
        nameProduct &&
        req.file &&
        priceProduct &&
        timestart &&
        timeend &&
        descProduct &&
        qtyProduct &&
        categoryId
      ) {
        if (NewSize.length >= 1 && NewSize.length <= 3) {
          if (deliveryType.length >= 1) {
            const addData = {
              name_product: nameProduct,
              image_product: req.file === undefined ? '' : req.file.filename,
              price_product: priceProduct,
              desc_product: descProduct,
              qty_product: qtyProduct,
              category_id: categoryId,
              time_start: timestart,
              time_end: timeend,
              homeDeliv: homeDeliv || 'OFF',
              dineIn: dineIn || 'OFF',
              takeaway: takeaway || 'OFF',
              code_discount: codeDiscount || '',
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
              'Can You Input Delivery Type Min 1 Delivery Type'
            )
          }
        } else {
          return helper.response(
            res,
            404,
            'Can You Input Size Minimum 1 Size Please And Max 3 Size'
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
        priceProduct,
        descProduct,
        qtyProduct,
        codeDiscount,
        categoryId,
        statusProduct,
        sizeL,
        sizeR,
        sizeXL,
        size200,
        size350,
        size400,
        timestart,
        timeend,
        dineIn,
        homeDeliv,
        takeaway
      } = req.body
      const checkId = await getProductbyId(id)
      const size = [sizeL, sizeR, sizeXL, size200, size350, size400]
      const NewSize = size.filter((e) => e === 'ON')
      const delivery = [dineIn, takeaway, homeDeliv]
      const deliveryType = delivery.filter((e) => e === 'ON')
      if (checkId.length > 0) {
        if (
          nameProduct &&
          priceProduct &&
          descProduct &&
          qtyProduct &&
          categoryId
        ) {
          if (categoryId > 0 && categoryId <= 5) {
            if (NewSize.length >= 1 && NewSize.length <= 3) {
              if (deliveryType.length >= 1) {
                let productImage
                if (req.file === undefined) {
                  productImage = {
                    image_product: checkId[0].image_product
                  }
                } else if (req.file.filename !== checkId[0].image_product) {
                  fs.unlink(
                    `./productImage/${checkId[0].image_product}`,
                    (err) => {
                      if (err) throw err
                      // if no error, file has been deleted successfully
                      console.log(
                        `Success Delete Image ${checkId[0].image_product}`
                      )
                    }
                  )
                  productImage = {
                    image_product:
                      req.file === undefined ? '' : req.file.filename
                  }
                }
                const updateData = {
                  name_product: nameProduct,
                  price_product: priceProduct,
                  desc_product: descProduct,
                  qty_product: qtyProduct,
                  category_id: categoryId,
                  code_discount: codeDiscount,
                  time_start: timestart,
                  time_end: timeend,
                  homeDeliv: homeDeliv || 'OFF',
                  dineIn: dineIn || 'OFF',
                  takeaway: takeaway || 'OFF',
                  status_product: statusProduct || 'ON',
                  update_at: new Date()
                }
                const FullUpdate = { ...updateData, ...productImage }
                const resultUpdateData = await UpdateProductModel(
                  FullUpdate,
                  id
                )
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
                  'Can You Input Delivery Type Min 1 Delivery Type'
                )
              }
            } else {
              return helper.response(
                res,
                404,
                'Can You Input Size Minimum 1 Size Please And Max 3 Size'
              )
            }
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
        fs.unlink(`./productImage/${checkId[0].image_product}`, (err) => {
          if (err) throw err
          // if no error, file has been deleted successfully
          console.log(`Success Delete Image ${checkId[0].image_product}`)
        })
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
