const helper = require('../helper/response')
const {
  getSubtotalbyDayModel,
  getSubtotalbyYearModel,
  getTotalorderbyMonth
} = require('../model/dashboardModel')

module.exports = {
  getSBbyday: async (req, res) => {
    try {
      const result = await getSubtotalbyDayModel()
      return helper.response(res, 200, 'Success Get Subtotal by day', result)
    } catch (err) {
      return helper.response(res, 400, 'Invalid Get Subtotal by day', err)
    }
  },
  getSBbyYear: async (req, res) => {
    try {
      const result = await getSubtotalbyYearModel()
      return helper.response(res, 200, 'Success Get Subtotal by Year', result)
    } catch (err) {
      return helper.response(res, 400, 'Invalid Get Subtotal by Year', err)
    }
  },
  getTObyMount: async (req, res) => {
    try {
      const result = await getTotalorderbyMonth()
      return helper.response(
        res,
        200,
        'Success Get Total Order by Month',
        result
      )
    } catch (err) {
      return helper.response(res, 400, 'Invalid Get Total Order by Month', err)
    }
  }
}
