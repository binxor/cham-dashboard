'use strict';

const Hapi = require('hapi');
var sqlite3 = require('sqlite3').verbose(); 
var constants = require('../config/config.js'); 
var prodOrDev = 'dev';
var paramDbLoc = constants[prodOrDev].params.location;
var dataDbLoc = constants[prodOrDev].readings.location;
var paramDb = new sqlite3.Database(paramDbLoc); 
var dataDb = new sqlite3.Database(dataDbLoc); 
var serverIP = constants[prodOrDev].server.ip;
var serverPort = constants[prodOrDev].server.port;

const server = new Hapi.Server();
server.connection({ port: serverPort, host: serverIP, routes: { cors: true }  });

server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('OK');
    }
},{
    method: 'GET',
    path: '/data/params',
    handler: function (request, reply) {
        reply (new Promise((rsv, rej) => {

            paramDb.serialize(function() { 
            
                paramDb.all("SELECT * FROM params", function(err, data) { 
                    if(err) rej(err)
                    else rsv(data);
                }); 

            }); 
        })) 
    } 
},{
    method: 'GET',
    path: '/data/readings',
    handler: function (request, reply) {
        reply (new Promise((rsv, rej) => {

            dataDb.serialize(function() { 
            
                dataDb.all("SELECT * FROM dhtreadings", function(err, data) { 
                    if(err) rej(err)
                    else rsv(data);
                }); 

            }); 
        })) 
    } 
}]);


server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});