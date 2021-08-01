'use strict';

const express = require('express');
const expressMetrics = require('express-metrics');
const server = express(); //To use log out and update go out waiter.
const MAINPATH = process.env.MAINPATH;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
//const metrics = process.env._METRICS_;
//
server.use(cors({
    credentials: true
}));
server.set('port', process.env._PORT_);
server.disable('x-powered-by');
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(expressMetrics({
    port: process.env._METRICS_,
}))

const {
    rWaiter,
    rMenu,
    rCategory,
    rTable,
    rAttend,
    rReprot,
    rAdmin
} = require('./routes/index');

/* It must be improved*/
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept,' +
        'Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use(MAINPATH, rWaiter);
server.use(MAINPATH, rMenu);
server.use(MAINPATH, rCategory);
server.use(MAINPATH, rAdmin);
server.use(MAINPATH, rTable);
server.use(MAINPATH, rAttend);
server.use(MAINPATH, rReprot);

server.listen(process.env._PORT_, () => {
    console.log('Server running in port number: ' + process.env._PORT_);
});