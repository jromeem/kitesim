// KiteSim Group 2K15
// app.js -- handles main requests
// whatever

var http = require('http');


// handle the request with a response
var handleRequest = function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello world\n');
};


var server = http.createServer(handleRequest);
server.listen(8080);

console.log('\nwow. node server starting 💻');
console.log('✨ ~   http://localhost:8080/  ~✨\n');
console.log("~🎵 Let's go fly a kite 🎵");