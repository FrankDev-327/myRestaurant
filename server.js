'use strict';

var schedule = require('node-schedule');
const {
    AttendControll
} = require('./controllers/index');
const http = require('http');
const express = require('express');
const expressMetrics = require('express-metrics');
const server = express();
const models = require('./models'); //To use log out and update go out waiter.
const expressFile = require('express-fileupload');
const MAINPATH = '/passing'
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainPath = process.env._MAINPATH_;
const metrics = process.env._METRICS_;
var arrAccess = [mainPath]; //To validate same origin and more.

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
server.use(expressFile({
    createParentPath: true
}));

server.use(expressMetrics({
    port: metrics,
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
    var origin = req.headers.origin
    if (arrAccess.indexOf(origin) == -1) {
        return res.status(500).json({
            message:'No está acturizado a acceder a este sitio.'
        });
    } else {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers',
            'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept,' +
            'Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    }

});

server.use(MAINPATH, rWaiter);
server.use(MAINPATH, rMenu);
server.use(MAINPATH, rCategory);
server.use(MAINPATH, rAdmin);
server.use(MAINPATH, rTable);
server.use(MAINPATH, rAttend);
server.use(MAINPATH, rReprot);

var auxServer = http.createServer(server).listen(server.get('port'), function () {
    console.log('Levantó el servicio en: ' + server.get('port'));
});

require('./controllers/emiters/emiter').sendDataToFront(auxServer);

//schedule.scheduleJob('*/5 * * * * *', () => {
//AttendControll.changeStateTable();
//});