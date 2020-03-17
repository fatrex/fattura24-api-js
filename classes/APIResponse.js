const XMLParser = require('fast-xml-parser')

class Fattura24APIResponse {
  constructor ({ data, error }) {
    this.rawResponse = data
    this.rawError = error
  }

  toJSON () {
    return this.__parse(this.rawResponse)
  }

  toString () {
    const { description } = this.__parse(this.rawResponse)
    return description
  }

  __parse (data) {
    try {
      const { root: parsed } = XMLParser.parse(data)
      return parsed
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Fattura24APIResponse
