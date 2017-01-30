var app   = require('./config/express');
	dbURI = 'localhost/alurapic'; 
	require('./config/database.js')(dbURI);

app.listen(3000, function() {
	console.log('Server running on port 3000');
});

