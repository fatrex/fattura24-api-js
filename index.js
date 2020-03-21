const axios = require('axios')
const querystring = require('querystring')
const XMLParser = require('fast-xml-parser').j2xParser
const _ = require('lodash')

const APIError = require('./classes/APIError')
const APIResponse = require('./classes/APIResponse')

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

  __parseItem (item) {
    let parsed
    if (Array.isArray(item)) {
      parsed = []
      for (const index in item) {
        parsed[index] = this.__parseItem(item[index])
      }
    } else if (typeof item === 'object') {
      const key = Object.keys(item)[0]
      parsed = {}
      parsed[key] = {}
      for (const innerKey in item[key]) {
        parsed[key][innerKey] = this.__parseItem(item[key][innerKey])
      }
    } else {
      const specialCharsRegex = new RegExp(/[^\w*]/g)
      if (specialCharsRegex.test(item)) {
        parsed = `<![CDATA[${item}]]>`
      } else {
        parsed = item
      }
    }
    return parsed
  }

  __buildXML (jsonData) {
    const parser = new XMLParser({ arrayMode: true })
    const xml = parser.parse({
      Fattura24: {
        Document: _.mapValues(jsonData, item => {
          return this.__parseItem(item)
        })
      }
    })
    return xml
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
        xml: this.__buildXML(customerData)
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
        xml: this.__buildXML(documentData)
      }
      const response = await this.$axios.post('/SaveDocument', querystring.stringify(payload))
      return new APIResponse(response)
    } catch (error) {
      throw new APIError(error.toString())
    }
  }
}

module.exports = Fattura24API
