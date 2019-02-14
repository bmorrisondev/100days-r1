const router = require('express').Router()
const controller = require('./controller')

router.post('/', async(req, res) => {
    try {
        let payload = {
            customerIdRef: req.body.customerIdRef,
            noteDetail: req.body.noteDetail
        }

        let createdNote = await controller.createNote(payload)

        res.status(200).send({
            status: 'ok',
            result: createdNote
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: 'messages.generalServerError',
            error: err
        })
    }
})

// TODO: implement as /api/customers/:customerId/notes
router.get('/:customerIdRef', async (req, res) => {
    try {
        let notes = await controller.getNotesForCustomer(req.params.customerIdRef)

        res.status(200).send({
            status: 'ok',
            result: notes
        })
    } catch (err) {
        res.status(400).send({
            message: 'messages.generalServerError',
            error: err
        });
    }
})

module.exports = router