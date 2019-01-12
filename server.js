var express = require('express');
var app = express();
var path = require("path");
app.use(express.static(__dirname + "/static"));
var server = app.listen(1337);
var io = require('socket.io')(server);
var counter = 0;

app.set('views', __dirname + '/static');
app.set('view engine', 'ejs');

io.on('connection', function(socket) {
    socket.emit('greeting', {msg: counter});
    socket.on('inc', function(data) {
        data.data++;
        counter++;
        socket.emit('cnt', data);
        socket.broadcast.emit('cnt', data);
    });
});

app.get('/', function(req, res){
    res.render('index');
});