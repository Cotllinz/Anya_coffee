const helper = require('../helper/response')
const {
  getSubtotalbyDayModel,
  getSubtotalbyYearModel
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
  }
}
