var express = require('express'),
	consign = require('consign'),
	app 	= express();

app.use(express.static('./public'));

consign({cwd : 'app'})
	.include('api')
	.then('routes')
	.into(app);

module.exports = app;