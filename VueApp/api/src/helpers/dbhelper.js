require('custom-env').env(true)
const mongoose = require('mongoose')

exports.connect = async () => {
    const connectionString = process.env.DB_CS
    console.log(connectionString)
    mongoose.connect(connectionString, { useNewUrlParser: true })
}