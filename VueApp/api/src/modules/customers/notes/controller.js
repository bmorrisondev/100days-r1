const Note = require('./models/Note')

exports.createNote = async function(payload) {
    try {
        let note = new Note({
            customerIdRef: payload.customerIdRef,
            noteDetail: payload.noteDetail
        })

        return await note.save()
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.getNotesForCustomer = async function (customerIdRef) {
    try {
        let search = {
            customerIdRef: customerIdRef
        }

        return await Note.find(search)
    } catch (err) {
        throw new Error(err.message)
    }
}