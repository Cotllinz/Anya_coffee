const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getHistoryByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getHistoryByuserId:${id}`, (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          `Success Get History Details by user id ${id}`,
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getHistoryDetailsByIdRedis: (req, res, next) => {
    client.get(
      `getHistoryDetailsByuserId:${JSON.stringify(req.query)}`,
      (err, result) => {
        if (!err && result) {
          return helper.response(
            res,
            200,
            'Success Get History Details',
            JSON.parse(result)
          )
        } else {
          next()
        }
      }
    )
  },
  clearDataHistoryRedis: (req, res, next) => {
    client.keys('getHistory*', (_err, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getHistoryRedis: (req, res, next) => {
    client.get('getHistory', (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          'Success Get History',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getHistoryAdminRedis: (req, res, next) => {
    client.get('getHistoryAdmin', (err, result) => {
      if (!err && result) {
        return helper.response(
          res,
          200,
          'Success Get History Admin',
          JSON.parse(result)
        )
      } else {
        /* console.log('History Admin Add to Redis') */
        next()
      }
    })
  }
}
