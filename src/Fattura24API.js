const axios = require('axios')
const querystring = require('querystring')

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
}

const methods = {
  testKey: '/TestKey',
  saveCustomer: '/SaveCustomer',
  saveDocument: '/SaveDocument'
}

for (const methodName in methods) {
  const endpoint = methods[methodName]
  Fattura24API.prototype[methodName] = async function (data) {
    try {
      const payload = {
        apiKey: this.apiKey,
        xml: Helpers.buildXML(data)
      }
      const response = await this.$axios.post(endpoint, querystring.stringify(payload))
      return new APIResponse(response)
    } catch (error) {
      return error
    }
  }
}

module.exports = Fattura24API
