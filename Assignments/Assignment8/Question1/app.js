import express from 'express';
import path from 'path';
import http from 'http';
var errorHandler = require('errorhandler');

let io = require('socket.io');
let app = express();

// Add configure for ui and port
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.use(errorHandler())
  }

// Set up express
let server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// Set up socket.io
io = require('socket.io').listen(server);

io.sockets.on('connection',  (socket) => {

    var list = io.sockets.sockets;
    var users = Object.keys(list);
   


    // Set the nickname property for a given client
    socket.on('nick', (nick) => {
        socket.nickname = nick;
        socket.emit('userlist', users);
    });

   

    // Relay chat data to all clients
    socket.on('chat', (data) => {
            
            let nick = socket.nickname; 

            if(!nick)
            {
                nick = 'Anonymous';
            }
            let nickname = nick;

            let payload = {
                message: data.message,
                nick: nickname
            };

            socket.emit('chat',payload);
            socket.broadcast.emit('chat', payload);
    });
});


