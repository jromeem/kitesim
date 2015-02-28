
// initialize app
var express = require('express');
var app = express();

// all includes
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app config -- using assets
app.use(express.static(__dirname + '/public'));

// router
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// new io connection found
io.on('connection', function (socket) {
    console.log('-- NEW USER CONNECTED --');
    // user is flying a kite!! :D
    socket.on('mousemove', function (data) {
        console.log('user move:', data);
        // this line sends the event (broadcasts it)
        // to everyone except the originating client.
        socket.broadcast.emit('moving', data);
    });
})

// listener
http.listen(8080, function(){
    console.log('wow. node server starting 💻');
    console.log('✨ ~   http://localhost:8080/  ~✨\n');
    console.log("~🎵 Let's go fly a kite 🎵");
});