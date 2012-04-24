'use strict';

var socket;

module.exports.getSocket = getSocket;
module.exports.setSocket = setSocket;

function getSocket() {
    return socket;
}
function setSocket(sock) {
    if (undefined == socket) socket = sock;
}