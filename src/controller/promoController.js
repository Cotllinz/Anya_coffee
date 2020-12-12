const {
  getAllPromoModal,
  getPromoByIdModal,
  addPromoModal,
  addSizePromoModal,
  updatePromoModal,
  updateSizePromoModel,
  deletePromoModel,
  deleteSizePromoModel
} = require('../model/promoModel')
const helper = require('../helper/response')

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
  AddPromo: async (req, res) => {
    try {
      const {
        namePromo,
        normalPrice,
        descPromo,
        codeCoupon,
        discountPromo,
        idCategory,
        /*    startExp,
        endExp, */
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
        namePromo &&
        normalPrice &&
        descPromo &&
        codeCoupon &&
        discountPromo &&
        idCategory
        /*  &&
        startExp &&
        endExp */
      ) {
        if (NewSize.length >= 2) {
          if (idCategory > 0 && idCategory <= 5) {
            const addPromo = {
              name_productPromo: namePromo,
              normal_price: normalPrice,
              desc_coupon: descPromo,
              code_coupon: codeCoupon,
              discount_coupon: discountPromo,
              id_categoryPromo: idCategory,
              start_expired: new Date(),
              end_expired: new Date(),
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
        codeCoupon,
        discountPromo,
        idCategory,
        /*    startExp,
        endExp, */
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
          codeCoupon &&
          discountPromo &&
          idCategory
          /*  &&
        startExp &&
        endExp */
        ) {
          if (idCategory > 0 && idCategory <= 5) {
            const updatePromo = {
              name_productPromo: namePromo,
              normal_price: normalPrice,
              desc_coupon: descPromo,
              code_coupon: codeCoupon,
              discount_coupon: discountPromo,
              id_categoryPromo: idCategory,
              start_expired: new Date(),
              end_expired: new Date(),
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
