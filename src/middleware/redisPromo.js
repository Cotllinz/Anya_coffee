const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getPromoByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getPromoById:${id}`, (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          `Success Get Promo by id ${id}`,
          JSON.parse(result)
        )
      } else {
        console.log(`Promo by id ${id} Add to Redis`)
        next()
      }
    })
  },
  clearDataPromoRedis: (req, res, next) => {
    client.keys('getPromo*', (_err, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getPromoRedislimit: (req, res, next) => {
    client.get(`getPromo:${JSON.stringify(req.query)}`, (err, result) => {
      if (!err && result) {
        const newResult = JSON.parse(result)
        return helper.response(
          res,
          200,
          'Success Get Promo',
          newResult.resultPromo,
          newResult.newPage
        )
      } else {
        next()
      }
    })
  },
  getPromoRedis: (req, res, next) => {
    client.get('getPromo', (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          'Success Get Promo',
          JSON.parse(result)
        )
      } else {
        console.log('Promo Add to Redis')
        next()
      }
    })
  }
}
