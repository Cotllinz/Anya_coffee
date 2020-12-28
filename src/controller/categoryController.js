const {
  getProductcategory,
  categoryCount,
  categoryLimit
} = require('../model/categoryModel')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()
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
  },
  getCategory: async (req, res) => {
    try {
      let { category, limit, page, sort } = req.query
      category = parseInt(category)
      limit = parseInt(limit)
      page = parseInt(page)
      let sorting
      if (sort) {
        sorting = sort
      } else {
        sorting = 'order by name_product ASC'
      }
      const totalCategory = await categoryCount(category)
      const totalPage = Math.ceil(totalCategory / limit)
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
        totalCategory,
        nextLink:
          nextLink && `http://localhost:3000/category/limit?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/category/limit?${prevLink}`
      }

      const resultCategory = await categoryLimit(
        category,
        limit,
        offset,
        sorting
      )
      const newData = {
        resultCategory,
        newPage
      }
      client.setex(
        `getProductCategory:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(newData)
      )
      if (resultCategory.length > 0) {
        return helper.response(
          res,
          200,
          'Succes GET Category',
          resultCategory,
          newPage
        )
      } else {
        return helper.response(res, 404, 'Category Not Ready')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
