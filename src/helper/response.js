module.exports = {
  response: (response, status, massage, data, pagination) => {
    const result = {}
    result.status = status || 200
    result.massage = massage
    result.data = data
    result.pagination = pagination

    return response.status(result.status).json(result)
  }
}
