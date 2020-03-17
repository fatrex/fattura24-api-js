class Fattura24APIError extends Error {
  constructor (message, code = 0) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = Fattura24APIError
