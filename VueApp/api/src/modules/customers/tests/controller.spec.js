const assert = require('assert')
const controller = require('../controller')
const dbhelper = require('../../../helpers/dbhelper')

describe('customer tests: controller', () => {
    beforeEach(async() => {
        await dbhelper.connect()
    })

    it('should save a customer', async() => {
        // Arrange
        let newCustomer = {
            firstName: 'Robin',
            lastName: 'Williams'
        }

        // Act
        let createdCustomers = await controller.createCustomers([newCustomer])

        // Assert
        assert.strictEqual(createdCustomers[0].firstName, newCustomer.firstName)
    })

    it('should get a list of customers', async () => {
        let customers = await controller.getCustomers()

        assert(customers.length > 0)
    })
})