var express 	= require('express'),
	consign 	= require('consign'),
	bodyParser 	= require('body-parser'), 
	app 		= express();

app.use(bodyParser.json());

app.use(express.static('./public'));

consign({cwd : 'app'})
	.include('api')
	.then('routes')
	.into(app);

module.exports = app;