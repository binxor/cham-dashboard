'use strict';

const Hapi = require('hapi');
var constants = require('../config/config.js');
var testData = require('../data/sensordata.js').testData;
var testParams = require('../data/sensordata.js').testParams;
var prodOrDev = constants.devOrProd;
var paramDbLoc = constants[ prodOrDev ].params.location;
var dataDbLoc = constants[ prodOrDev ].readings.location;
var serverIP = constants[ prodOrDev ].server.ip;
var serverPort = constants[ prodOrDev ].server.port;

const server = new Hapi.Server();
server.connection({ port: serverPort, host: serverIP, routes: { cors: true } });

server.route([ {
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('OK');
  }
}, {
  method: 'GET',
  path: '/data/params',
  handler: function (request, reply) {
    reply(new Promise((rsv, rej) => {
      rsv(testParams);
    }))
  }
}, {
  method: 'GET',
  path: '/data/readings',
  handler: function (request, reply) {
    reply(new Promise((rsv, rej) => {
      rsv(testData);
    }))
  }
} ]);


server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

