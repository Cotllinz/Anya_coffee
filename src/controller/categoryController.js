const {
  getProductcategory,
  getPromocategory
} = require('../model/categoryModel')

const helper = require('../helper/response')

module.exports = {
  getProductandPromoCategory: async (req, res) => {
    try {
      const { category } = req.params
      if (category > 0 && category <= 5) {
        const result = await getProductcategory(category)
        const resultPromo = await getPromocategory(category)
        const newResult = {
          result,
          resultPromo
        }
        return helper.response(
          res,
          200,
          `Success Get Category ${category}`,
          newResult
        )
      } else {
        return helper.response(res, 400, `Category ${category} not Found `)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
