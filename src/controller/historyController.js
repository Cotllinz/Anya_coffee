const {
  addHistory,
  addDetailsHistory,
  getHistory,
  getByIduser,
  deleteHistoryModel,
  offDetailsHistory,
  searchHistory,
  historyAdminConfirm,
  getHistoryAdmin
} = require('../model/historyModel')
const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getHistory: async (req, res) => {
    try {
      const result = await getHistory()
      client.setex('getHistory', 3600, JSON.stringify(result))
      return helper.response(res, 200, 'Success Get History', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getbyid: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await getByIduser(id)
      if (resultId.length > 0) {
        client.setex(`getHistoryByuserId:${id}`, 3600, JSON.stringify(resultId))
        return helper.response(
          res,
          200,
          `Success Get History by user id ${id}`,
          resultId
        )
      } else {
        return helper.response(
          res,
          404,
          `Invalid Get History by user id ${id} Not Found`
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  addHistory: async (req, res) => {
    try {
      const { userId, paymentMethod, invoicePayment, subTotal } = req.body
      if (userId && paymentMethod && invoicePayment) {
        const setHistory = {
          user_id: userId,
          payment_method: paymentMethod,
          invoice_payment: invoicePayment,
          sub_total: subTotal,
          create_at: new Date()
        }
        const resultHistory = await addHistory(setHistory)

        return helper.response(res, 200, 'Success Add History', resultHistory)
      } else {
        return helper.response(
          res,
          404,
          'Invalid Add History !!! Input Cant empty'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  addDetails: async (req, res) => {
    try {
      const detailsHistory = req.body
      let resultDetailsHistory
      for (let i = 0; i < detailsHistory.length; i++) {
        const {
          idHistory,
          idProduct,
          qty,
          total,
          sizeDetail,
          statusDelivery,
          table
        } = detailsHistory[i]
        const setDetails = {
          id_historydetails: idHistory,
          id_product: idProduct,
          qty: qty,
          total: total,
          status_delivery: statusDelivery,
          status_table: table || '',
          size_detail: sizeDetail,
          create_at: new Date()
        }
        resultDetailsHistory = await addDetailsHistory(setDetails)
      }
      return helper.response(
        res,
        200,
        'Success Add Details History',
        resultDetailsHistory
      )
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  deleteHistory: async (req, res) => {
    try {
      const { id } = req.params
      const deleteHistory = {
        delete_at: new Date()
      }
      const result = await deleteHistoryModel(deleteHistory, id)
      const deleteDetails = {
        delete_at: new Date(),
        status_details: 'OFF'
      }
      await offDetailsHistory(deleteDetails, id)
      return helper.response(res, 200, 'Success Delete History', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  AdminConfirmOrder: async (req, res) => {
    try {
      const { id } = req.params
      const confirmOrder = {
        status_history: 'ON'
      }
      const result = await historyAdminConfirm(confirmOrder, id)
      return helper.response(res, 200, 'Order Done', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getAdminHistory: async (req, res) => {
    try {
      const result = await getHistoryAdmin()
      client.setex('getHistoryAdmin', 3600, JSON.stringify(result))
      return helper.response(res, 200, 'Success Get History Admin', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  searchHistory: async (req, res) => {
    try {
      const { invoice } = req.query
      const result = await searchHistory(invoice)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success Get History by invoice history',
          result
        )
      } else {
        return helper.response(
          res,
          404,
          'Invalid Get History by invoice history'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
