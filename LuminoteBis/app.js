var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    MongoClient = require("mongodb").MongoClient;



// Chargement de la page index.html
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/front', function (req, res) {
    res.sendfile(__dirname + '/pageFront.html');
});
app.get('/behemoth.mp3', function (req, res) {
    res.sendfile(__dirname + '/behemoth.mp3');
});
app.get('/future_club.mp3', function (req, res) {
    res.sendfile(__dirname + '/future_club.mp3');
});
var connectCounter=0;
io.sockets.on('connect', function (socket) {
    connectCounter++;
    console.log(connectCounter);
    socket.broadcast.emit('lamp_connected');
    socket.on('anyone_connected',function(){
        console.log('demande si lamp déja connecté ?');
        if(connectCounter==2) {
            console.log('réponse positive');
            socket.emit('lamp_already_connected');
        }
    })
    
    socket.on('dispatch',function(action){
        console.log('j\'ai recu ton message charles',action);
        socket.broadcast.emit('DISPLAY_CONTENT',action);

    });
    socket.on('disconnect',function(){
        connectCounter--;
        console.log('disconnection');
        socket.broadcast.emit('lamp_disconnected');
    });
});

server.listen(3200);
