//app.js
var express = require('express');
var app = express();
var serv = require('http').Server(app);
 
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
 
var servport = 2000;

serv.listen(servport);
console.log("Server Started On Port " + servport + ".");

var SOCKET_LIST = {};
 
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.number = "" + Math.floor(10 * Math.random());
    SOCKET_LIST[socket.id] = socket;
 	console.log(socket.id + " connected.")

    socket.on('disconnect',function(){
    	console.log(socket.id + " disconnected.")
        delete SOCKET_LIST[socket.id];
    });
   
});