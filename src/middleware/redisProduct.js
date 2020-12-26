const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getProductByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getProductById:${id}`, (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          `Success Get Product by id ${id}`,
          JSON.parse(result)
        )
      } else {
        console.log(`Product by id ${id} Add to Redis`)
        next()
      }
    })
  },
  clearDataProductRedis: (req, res, next) => {
    client.keys('getProduct*', (_err, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getProductRedislimit: (req, res, next) => {
    client.get(`getProduct:${JSON.stringify(req.query)}`, (err, result) => {
      if (!err && result) {
        const newResult = JSON.parse(result)
        return helper.response(
          res,
          200,
          'Success Get Product',
          newResult.resultProduct,
          newResult.newPage
        )
      } else {
        next()
      }
    })
  },
  getProducthaveaPromoRedis: (req, res, next) => {
    client.get('getProductPromo', (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          'Success Get Product Promo',
          JSON.parse(result)
        )
      } else {
        console.log('Product Promo Add to Redis')
        next()
      }
    })
  },
  getProductRedis: (req, res, next) => {
    client.get('getProduct', (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          'Success Get Product',
          JSON.parse(result)
        )
      } else {
        console.log('Product Add to Redis')
        next()
      }
    })
  }
}
