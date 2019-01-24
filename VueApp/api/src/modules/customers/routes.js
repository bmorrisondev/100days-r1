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
        let query = req.params
        let customers = await controller.getCustomers()

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