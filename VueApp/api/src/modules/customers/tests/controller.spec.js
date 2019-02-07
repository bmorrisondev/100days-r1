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

    it('should update a customer', async () => {
        let randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        let customers = await controller.getCustomers()

        let originalCustomer = JSON.parse(JSON.stringify(customers[0]))

        let updatedCustomer = customers[0]
        updatedCustomer.firstName = `John-${randomString}`

        await controller.updateCustomer(updatedCustomer._id, updatedCustomer)

        let checkCustomers = await controller.getCustomers()

        assert.notDeepEqual(originalCustomer.firstName, checkCustomers[0].firstName)
    })
})