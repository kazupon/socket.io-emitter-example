var emitter = require('socket.io-emitter')({ host: 'localhost', port: '6379' });
var debug = require('debug')('back-end');

setInterval(function () {
  debug('emit time event');
  emitter.emit('time', new Date);
}, 2000);
