var Config = require('./config')
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/views/layout/assets/'));
console.log(__dirname + '/views/layout/assets/')

var http = require('http').Server(app);

var socket = require('socket.io')(http, {
    pingInterval: 15000,
    pingTimeout: 25000,
});
var siteURL = Config.siteURL;
var port = process.env.PORT || 3000;
var path = require('path');
http.listen(port, function () { });
// log the connected socket
socket.on('connection', function (io ) {
    // when a message arrive on this channel it will be passed to the vue
    io.on('emmiter' , function(data) {
      socket.emit('view_emmit' , data )
    })
});

// render a view with express
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/views/layout/index.html'));
})
//
