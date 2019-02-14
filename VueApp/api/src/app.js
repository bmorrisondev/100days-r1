
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dbhelper = require('./helpers/dbhelper')

// Routes
const customerRoutes = require('./modules/customers/routes')
const noteRoutes = require('./modules/customers/notes/routes')

dbhelper.connect()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use('/api/customers', customerRoutes);
app.use('/api/notes', noteRoutes);

module.exports = app