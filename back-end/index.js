var io = require('socket.io-emitter')();

setInterval(function () {
  io.emit('time', new Date);
}, 2000);
