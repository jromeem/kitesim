
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    // res.send('Hello World!');
    res.sendFile(__dirname + 'index.html');
})

http.listen(8080, function(){
    console.log('\nwow. node server starting ');
    console.log('✨ ~   http://localhost:8080/  ~✨\n');
    console.log("~🎵 Let's go fly a kite 🎵");
})