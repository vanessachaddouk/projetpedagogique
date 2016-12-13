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

io.sockets.on('connection', function (socket) {
    console.log('coucou');
    socket.on('dispatch',function(action){
        console.log('j\'ai recu ton message charles',action);
        switch(){
            case (action.type=='SEND_IMAGE'):
                console.log('une image',action.payload);
                socket.broadcast.emit('contenu_afficher',action.payload);
                break;
            case (action.type=='SEND_TEXT'):
                console.log('un texte',action.payload);
                socket.broadcast.emit('contenu_afficher',action.payload);
                break;
        }

    });
});

server.listen(3200);
