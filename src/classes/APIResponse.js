const XMLParser = require('fast-xml-parser')
const HTMLEntities = require('html-entities').AllHtmlEntities
const htmlEntities = new HTMLEntities()

class Fattura24APIResponse {
  constructor ({ data, error }) {
    this.rawResponse = data || error
    return this.__parse(data)
  }

  __parse (rawData) {
    try {
      const { root: parsed } = XMLParser.parse(rawData)
      const { returnCode, description, ...data } = parsed
      if (returnCode < 0) throw new Error(description)
      return {
        message: htmlEntities.decode(description),
        data
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = Fattura24APIResponse
