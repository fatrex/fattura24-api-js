const axios = require('axios')

const APIError = require('./classes/APIError')
const APIResponse = require('./classes/APIResponse')

class Fattura24API {
  constructor (apiKey, apiVersion = '0.3') {
    if (!apiKey) throw new Error('apiKey is missing!')
    this.apiKey = apiKey
    this.apiVersion = apiVersion

    this.$axios = axios.create({
      baseURL: `https://www.app.fattura24.com/api/v${this.apiVersion}`
    })
  }

  async testKey () {
    try {
      const response = await this.$axios.post('/TestKey', {
        apiKey: this.apiKey
      })
      return new APIResponse(response)
    } catch (error) {
      throw new APIError(error.toString())
    }
  }
}

module.exports = Fattura24API
