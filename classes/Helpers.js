const XMLParser = require('fast-xml-parser').j2xParser
const _ = require('lodash')

class Helpers {
  static __parseItem (item) {
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

  static buildXML (jsonData) {
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
}

module.exports = Helpers
