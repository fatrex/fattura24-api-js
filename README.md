[![codebeat badge](https://codebeat.co/badges/e475c336-c496-40ea-9f0f-955f34746915)](https://codebeat.co/projects/github-com-dnlnrs-fattura24-api-js-master)

# Fattura24 API Wrapper ~ Node.js
A simple Node.js wrapper to work with the API exposed by [Fattura24](https://www.fattura24.com/api-documentazione/).

## Usage
This package in simply a wrapper for the Fattura24 API. It's a collection of methods that reflects all the API endpoints. The main advantage is the avoidance of the xml manipulation because all the input and output payloads are JSON objects.

#### Install it
```bash
yarn install fattura24-api-js
// OR npm install fattura24-ap-js
```
#### Require it
```javascript
const Fattura24API = require('fattura24-api-js)
```

#### Use it
```javascript
const fattura24 = new Fattura24API('InSert4PIKeyHeRe')

// Create or update a customer
await fattura24.saveCustomer({
  CustomerName: 'Marta Bianchi',
  CustomerCountry: 'IT',
  CustomerVatCode: '000000000'
})

// Create a new document (ie. invoice)
await fattura24.saveDocument({
    DocumentType: 'I',
    CustomerName: 'Mario Rossi',
    CustomerAddress: 'Via Milano, 10',
    CustomerPostcode: 24040,
    CustomerCity: 'Bergamo',
    CustomerProvince: 'BG',
    CustomerCountry: 'IT',
    CustomerVatCode: '000000000',
    CustomerCellPhone: '0000000000',
    DeliveryName: 'Mario Rossi',
    TotalWithoutTax: 900,
    VatAmount: 198,
    Total: 1098,
    F24OrderId: 12345,
    Payments: [
      {
        Payment: {
          Date: '2020-01-01',
          Amount: 100,
          Paid: true
        }
      },
      {
        Payment: {
          Date: '2020-01-02',
          Amount: 100,
          Paid: false
        }
      }
    ],
    Rows: [
      {
        Row: {
          Code: 'B100',
          Description: 'Work test - 1',
          Qty: 2,
          Price: 300,
          VatCode: 22,
          VatDescription: '22%'
        }
      }
    ]
  })
```


## Changelog


## License and Copyright
Licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) license.

(c) 2020 [Daniele Lenares](https://dnlnrs.dev)