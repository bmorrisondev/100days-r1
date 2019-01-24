
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const customerRoutes = require('./modules/customers/routes')
const morgan = require('morgan')
const dbhelper = require('./helpers/dbhelper')

dbhelper.connect()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Approve response to pre-flight requests
    if('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

// var port = process.env.PORT || 8082

app.use('/api/customers', customerRoutes);

module.exports = app