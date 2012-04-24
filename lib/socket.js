'use strict';

var socket;
var vent = require("../lib/vent");

module.exports.getSocket = getSocket;
module.exports.setIO = setIO;

function setIO(io) {    
    io.sockets.on('connection', function (socket) {
        setSocket(socket);
        
        socket.on('ventFromClient', function(data) {
        vent.addVent(data.username, data.text, data.stream, function() {
            // Broadcast after added to database
            socket.broadcast.emit('vent', {username: data.username, text: data.text, stream: data.stream});
        });             
           
        });
    });
}

function getSocket() {
    return socket;
}
function setSocket(sock) {
    if (undefined == socket) socket = sock;
}