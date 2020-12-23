const {
  getProductcategory
} = require('../model/categoryModel')

const helper = require('../helper/response')

module.exports = {
  getProductandPromoCategory: async (req, res) => {
    try {
      const { category } = req.params
      if (category > 0 && category <= 5) {
        const result = await getProductcategory(category)
        return helper.response(
          res,
          200,
          `Success Get Category ${category}`,
          result
        )
      } else {
        return helper.response(res, 400, `Category ${category} not Found `)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
