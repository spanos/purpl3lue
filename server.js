// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express')
  , app      = express()
  , http	 = require('http')
  , server   = http.createServer(app)
  , io       = require('socket.io').listen(server)
  , port     = process.env.PORT || 8080
  , mongoose = require('mongoose')
  , passport = require('passport')
  , flash    = require('connect-flash')
  , configDB = require('./config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

io.on('connection', function(socket) {
	console.log(socket);
	socket.emit('connected1', 'hello123');

	socket.on('test1', function(data) {
		console.log('Test 1 initiating : ' + data);
	});
	
	socket.on('test2', function(data) {
		console.log('Test 2 initiating : ' + data);
		//io.sockets.emit('test3', data);
		io.sockets.emit('test3', data);
		console.log('Should have sent test3');	
	});
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
server.listen(8080);
app.use(express.static(__dirname + '/public'));
console.log('The magic happens on port ' + port);