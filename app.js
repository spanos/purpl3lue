var fs = require('fs')
, http = require('http')
, socketio = require('socket.io');
 
var port = process.env.PORT || CONFIG.port;

var server = http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-type': 'text/html'});
	res.end(fs.readFileSync(__dirname + '/index.html'));
	}).listen(port, function() {
		console.log('Listening at: http://purpl3lue.herokuapp.com');
	});
 
socketio.listen(server).on('connection', function (socket) {
	socket.on('message', function (msg) {
		console.log('Message Received: ', msg);
		socket.broadcast.emit('message', msg);
	});
});