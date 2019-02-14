const mongoose = require('mongoose')
const Schema = mongoose.Schema

var NoteSchema = new Schema({
    customerIdRef: String,
    noteDetail: String,
    createdOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Note', NoteSchema);
