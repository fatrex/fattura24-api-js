[![codebeat badge](https://codebeat.co/badges/e475c336-c496-40ea-9f0f-955f34746915)](https://codebeat.co/projects/github-com-dnlnrs-fattura24-api-js-master)

# Fattura24 API Wrapper ~ Node.js
A simple Node.js wrapper to work with the API exposed by [Fattura24](https://www.fattura24.com/api-documentazione/).

## Usage
This package in simply a wrapper for the Fattura24 API. It's a collection of methods that reflects all the API endpoints. The main advantage is the avoidance of the xml manipulation because all the input and output payloads are JSON objects.

#### Install it
```
yarn install fattura24-api-js
// OR npm install fattura24-ap-js
```
#### Require it
```
const Fattura24API = require('fattura24-api-js)
```

#### Use it
```
const fattura24 = new Fattura24API('InSert4PIKeyHeRe')
await fattura24.saveCustomer({
  CustomerName: 'Marta Bianchi',
  CustomerCountry: 'IT',
  CustomerVatCode: '000000000'
})
```


## Changelog


## License and Copyright
Licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) license.

(c) 2020 [Daniele Lenares](https://dnlnrs.dev)