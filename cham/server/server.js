'use strict';

const Hapi = require('hapi');
var sqlite3 = require('sqlite3').verbose(); 
var constants = require('../config/config.js'); 
var dbloc = constants.db.location; 
var db = new sqlite3.Database(dbloc); 

const server = new Hapi.Server();
server.connection({ port: 3001, host: 'localhost', routes: { cors: true }  });

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

            db.serialize(function() { 
            
                db.all("SELECT * FROM params", function(err, data) { 
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