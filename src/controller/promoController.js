const {
  getAllPromoModal,
  getPromoByIdModal,
  addPromoModal,
  addSizePromoModal,
  updatePromoModal,
  updateSizePromoModel,
  deletePromoModel,
  deleteSizePromoModel,
  getPromoCount,
  getPromoLimitModel,
  getPromoBySearch,
  getPromoSort
} = require('../model/promoModel')
const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getAllPromo: async (req, res) => {
    try {
      const result = await getAllPromoModal()
      return helper.response(res, 200, 'Success Get Promo Product', result)
    } catch (err) {
      return helper.response(res, 400, 'Invalid Get Promo Product', err)
    }
  },
  getPromoById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getPromoByIdModal(id)
      if (result.length > 0) {
        return helper.response(res, 200, `Success Get Promo Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Invalid Get Promo Id ${id}`)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getPromoLimit: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalProduct = await getPromoCount()
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
        totalProduct,
        nextLink: nextLink && `http://localhost:3000/promo/limit?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/promo/limit?${prevLink}`
      }
      const resultProduct = await getPromoLimitModel(limit, offset)
      return helper.response(
        res,
        200,
        'Succes GET Promo By Limit',
        resultProduct,
        newPage
      )
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getSortingAscPromo: async (req, res) => {
    try {
      const { sort } = req.query
      console.log(sort)
      const result = await getPromoSort(sort)
      return helper.response(res, 200, 'Success Sort and GET Promo', result)
    } catch (err) {
      return helper.response(res, 400, 'Invalid GET Sort Promo', err)
    }
  },
  searchPromo: async (req, res) => {
    try {
      const { search } = req.query
      const resultSearchPromo = await getPromoBySearch(search)
      return helper.response(
        res,
        200,
        'Success GET Promo Product',
        resultSearchPromo
      )
    } catch (err) {
      return helper.response(res, 400, 'Invalid Search Promo', err)
    }
  },
  AddPromo: async (req, res) => {
    try {
      const {
        codeCoupon,
        minPurchase,
        productId,
        discountPromo,
        startExp,
        endExp,
        statusPromo,
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
        minPurchase &&
        codeCoupon &&
        productId &&
        discountPromo &&
        endExp &&
        startExp
      ) {
        if (NewSize.length >= 1) {
          const addPromo = {
            min_purchase: minPurchase,
            code_coupon: codeCoupon,
            product_id: productId,
            discount_coupon: discountPromo,
            start_expired: startExp,
            end_expired: endExp,
            status_promo: statusPromo || 'ON',
            create_at: new Date()
          }
          const resultAddPromo = await addPromoModal(addPromo)
          const sizePromo = {
            id_sizeProduct: resultAddPromo.id_coupon,
            size_L: sizeL || 'OFF',
            size_R: sizeR || 'OFF',
            size_XL: sizeXL || 'OFF',
            size_200: size200 || 'OFF',
            size_350: size350 || 'OFF',
            size_400: size400 || 'OFF',
            type: 'Promo',
            status_product: resultAddPromo.status_promo
          }
          await addSizePromoModal(sizePromo)
          return helper.response(
            res,
            200,
            'Succes Add Promo Product',
            resultAddPromo
          )
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
          'Check Promo Again !!!, input cant be empty'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  updatePromo: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await getPromoByIdModal(id)
      const {
        namePromo,
        normalPrice,
        descPromo,
        productId,
        codeCoupon,
        discountPromo,
        idCategory,
        /* /*    startExp, */
        endExp,
        statusPromo,
        sizeL,
        sizeR,
        sizeXL,
        size200,
        size350,
        size400
      } = req.body
      if (checkId.length > 0) {
        if (
          namePromo &&
          normalPrice &&
          descPromo &&
          productId &&
          codeCoupon &&
          discountPromo &&
          idCategory &&
          endExp
        ) {
          if (idCategory > 0 && idCategory <= 5) {
            const updatePromo = {
              name_productPromo: namePromo,
              normal_price: normalPrice,
              desc_coupon: descPromo,
              code_coupon: codeCoupon,
              product_id: productId,
              discount_coupon: discountPromo,
              id_categoryPromo: idCategory,
              start_expired: new Date(),
              end_expired: endExp,
              status_promo: statusPromo || 'ON',
              update_at: new Date()
            }

            const resultUpdatePromo = await updatePromoModal(updatePromo, id)
            const updateSizePromo = {
              size_L: sizeL || 'OFF',
              size_R: sizeR || 'OFF',
              size_XL: sizeXL || 'OFF',
              size_200: size200 || 'OFF',
              size_350: size350 || 'OFF',
              size_400: size400 || 'OFF',
              status_product: resultUpdatePromo.status_promo
            }
            await updateSizePromoModel(updateSizePromo, id)
            return helper.response(
              res,
              200,
              'Succes Add Promo Product',
              resultUpdatePromo
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
            'Check Promo Again !!!, input cant be empty'
          )
        }
      } else {
        return helper.response(res, 404, `Product by Id : ${id} Not Found`)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  deletePromo: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await getPromoByIdModal(id)
      const deletePromo = {
        status_promo: 'OFF',
        delete_at: new Date()
      }
      const result = await deletePromoModel(deletePromo, id)
      const deleteSizePromo = {
        status_product: 'OFF'
      }
      await deleteSizePromoModel(deleteSizePromo, id)
      if (checkId.length > 0) {
        return helper.response(res, 200, `Success Delete Id ${id}`, result)
      } else {
        return helper.response(
          res,
          404,
          `Invalid Delete Id ${id} Because Not Found`
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
