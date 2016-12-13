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

    MongoClient.connect("mongodb://localhost/rapsodie", function(error, db) {

        db.collection("content").find({page:1}).toArray(function (error, results) {
            if (error) throw error;

            results.forEach(function(i, obj) {
                socket.emit('creation_button', {contenu:results[obj].contenu, type:results[obj].type, object: results[obj]._id ,description : results[obj].description});
            });
        });
        socket.on('envoi_donnees',function(id){
            var MongoObjectID = require("mongodb").ObjectID;
            var idToFind      = id;           // Identifiant, sous forme de texte
            var objToFind     = { _id: new MongoObjectID(idToFind) }; // Objet qui va nous servir pour effectuer la recherche


            db.collection("content").findOne(objToFind,function(error,result){

                socket.broadcast.emit('data_visualisation',{type:result.type , contenu:result.contenu});
            });

        });


        // REQUIRE button on new page

        socket.on('require_button',function(page_require){
            db.collection("content").find({page:page_require}).toArray(function (error, results) {
                if (error) throw error;

                results.forEach(function(i, obj) {
                    socket.emit('creation_button', {contenu:results[obj].contenu, type:results[obj].type, object: results[obj]._id ,description : results[obj].description});
                });
            });
        });
    });



});

server.listen(3200);
