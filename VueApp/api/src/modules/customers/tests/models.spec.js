const assert = require('assert')
const Customer = require('../models/Customer')

describe('customer tests: models', () => {
    describe('Customer.js', () => {
        it('should create a customer', () => {
            let customer = new Customer({
                firstName: 'Brian',
                lastName: 'Morrison'
            })

            let error = customer.validateSync()

            assert.equal(error, undefined)
        })
    })
})
