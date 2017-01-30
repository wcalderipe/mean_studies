module.exports = function(uri) {

	var mongoose = require('mongoose');

	mongoose.connect('mongodb://' + uri);

	mongoose.connection.on('connected', function(){
		console.log('Connected to database.');
	});

	mongoose.connection.on('error', function(err){
		console.log('Damn, could not connect to database.\n' + err);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('\nDisconnected from database');
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Connection closed due to application closing');
			process.exit(0);
		});
	});
}