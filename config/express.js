var express 	= require('express'),
	consign 	= require('consign'),
	bodyParser 	= require('body-parser'), 
	app 		= express();


// Setter to make a global environment variable, acessible all over the application.
app.set('secret', 'tokenAuth');

app.use(bodyParser.json());

app.use(express.static('./public'));

// 'cwd' stands for 'current working directory'. That means consign is going to load from 'app', ignoring all directories above it. 
// If a 'cwd' key is not defined, the default behavior is to load from the root directory.
// The loading order must follow the dependency hierarchy. e.g. "does 'routes' depend on 'api'? If so, 'api' must be loaded first."

consign({cwd : 'app'})
	.include('models')
	.then('api')
	.then('routes/auth.js') // Makes sure the auth module is loaded before others
	.then('routes')
	.into(app);

module.exports = app;