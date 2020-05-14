'use strict';

const Hapi = require('hapi');
var constants = require('../config/config.js');
var prodOrDev = constants.devOrProd;
var paramDbLoc = constants[ prodOrDev ].params.location;
var dataDbLoc = constants[ prodOrDev ].readings.location;
var serverIP = constants[ prodOrDev ].server.ip;
var serverPort = constants[ prodOrDev ].server.port;

const server = new Hapi.Server();
server.connection({ port: serverPort, host: serverIP, routes: { cors: true } });

let testParams = [ // TODO - from db
  { id: 1, name: "temperature", min: 50, max: 120, updated: new Date('10/01/2017 04:04:39') },
  { id: 2, name: "humidity", min: 50, max: 100, updated: new Date('10/01/2017 04:07:48') }
];

let testData = [ // TODO - from db
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-02 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-02 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-02 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-03 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-03 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-03 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-04 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-04 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-04 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-05 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-05 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-05 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-06 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-06 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-06 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-07 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-07 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-07 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-08 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-08 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-08 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-09 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-09 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-09 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-10 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-10 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-10 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-11 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-11 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-11 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-12 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-12 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-12 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-13 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-13 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-13 010:14:29', device: 'am2302'},
  {id: 1270, temperature: 77.9, humidity: 13.1, timestamp: '2020-05-14 08:14:29', device: 'am2302'},
  {id: 1271, temperature: 78.9, humidity: 23.1, timestamp: '2020-05-14 09:14:29', device: 'am2302'},
  {id: 1272, temperature: 79.9, humidity: 43.1, timestamp: '2020-05-14 010:14:29', device: 'am2302'},
];

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

