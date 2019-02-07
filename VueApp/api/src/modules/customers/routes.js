const router = require('express').Router();
const controller = require('./controller');

// Create new customers
router.post('/', async(req, res) => {
    try {
        let customers = req.body

        let createdCustomers = await controller.createCustomers(customers)

        res.send({
            status: "ok",
            data: createdCustomers
        });
    } catch (err) {
        // logService.error(req, req, err);
        console.log(err)
        res.status(400).send({
            message: 'messages.generalServerError',
            error: err
        });
    }
});

// Get all customers
router.get('/:id?', async(req, res) => {
    try {
        let query = {}
        if(req.params.id !== undefined && req.params.id !== null) {
            query = {
                _id: req.params.id
            }
        }
        let customers = await controller.getCustomers(query)

        res.send({
            data: customers
        });
    } catch (err) {
        res.status(400).send({
            message: 'messages.generalServerError',
            error: err
        });
    }
});

// Get all customers
router.put('/:_id', async(req, res) => {
    try {
        let customers = await controller.updateCustomer(req.params._id, req.body)

        res.send({
            data: customers
        });
    } catch (err) {
        res.status(400).send({
            message: 'messages.generalServerError',
            error: err
        });
    }
});

module.exports = router;