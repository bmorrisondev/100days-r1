const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CustomerSchema = new Schema({
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('Customer', CustomerSchema);
