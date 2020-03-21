const axios = require('axios')
const querystring = require('querystring')

const APIError = require('./classes/APIError')
const APIResponse = require('./classes/APIResponse')
const Helpers = require('./classes/Helpers')

class Fattura24API {
  constructor (apiKey, apiVersion = '0.3') {
    if (!apiKey) throw new Error('apiKey is missing!')
    this.apiKey = apiKey
    this.apiVersion = apiVersion

    this.$axios = axios.create({
      baseURL: `https://www.app.fattura24.com/api/v${this.apiVersion}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  async testKey () {
    try {
      const payload = {
        apiKey: this.apiKey
      }
      const response = await this.$axios.post('/TestKey', querystring.stringify(payload))
      return new APIResponse(response)
    } catch (error) {
      throw new APIError(error.toString())
    }
  }

  async saveCustomer (customerData) {
    try {
      const payload = {
        apiKey: this.apiKey,
        xml: Helpers.buildXML(customerData)
      }
      const response = await this.$axios.post('/SaveCustomer', querystring.stringify(payload))
      return new APIResponse(response)
    } catch (error) {
      throw new APIError(error.toString())
    }
  }

  async saveDocument (documentData) {
    try {
      const payload = {
        apiKey: this.apiKey,
        xml: Helpers.buildXML(documentData)
      }
      const response = await this.$axios.post('/SaveDocument', querystring.stringify(payload))
      return new APIResponse(response)
    } catch (error) {
      throw new APIError(error.toString())
    }
  }
}

module.exports = Fattura24API
