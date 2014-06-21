var debug = require('debug')('front-end');
var app = require('express')();
var http = require('http').Server(app);
var redis = require('redis');
var redisAdapter = require('socket.io-redis');


app.get('/', function (req, res) {
  res.sendfile('index.html');
});


var pub = redis.createClient();
var sub = redis.createClient(null, null, { detect_buffers: true });
var io = require('socket.io')(http, {
  adapter: redisAdapter({ pubClient: pub, subClient: sub })
});


http.listen(3000, function () {
  debug('listening on *:3000');

  io.on('connection', function (socket) {
    debug('connected');

    socket.on('disconnect', function () {
      debug('disconnected');
    });

    socket.on('ack', function (payload) {
      debug('ack event', typeof(payload), payload);
    });
  });
});
